import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import dayjs from "dayjs";

interface DocumentItem {
    id: number;
    title: string;
    validTo: string;
    type: string;
    photoUrl: string | null;
}

interface NoteItem {
    id: number;
    text: string;
    createdAt: string;
}

interface Trailer {
    id: number;
    registrationNumber: string;
    createdAt: string;
    documents: DocumentItem[];
    notes: NoteItem[];
}

export default function TrailerProfile() {

    const { authFetch } = useAuth();
    const { id } = useParams();

    const [trailer, setTrailer] = useState<Trailer | null>(null);
    const [loading, setLoading] = useState(true);

    const [docTitle, setDocTitle] = useState("");
    const [docValidTo, setDocValidTo] = useState("");
    const [docPhoto, setDocPhoto] = useState<File | null>(null);

    const [documentError, setDocumentError] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const [noteText, setNoteText] = useState("");
    const [noteError, setNoteError] = useState<string | null>(null);

    const fetchTrailer = async () => {

        try {

            const res = await authFetch(`/api/trailer/${id}`);

            if (!res.ok) throw new Error();

            const data = await res.json();

            setTrailer(data);

        } catch (e) {

            console.error(e);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTrailer();

    }, [id]);

    const handleDeleteDocument = async (docId: number) => {

        if (confirmDeleteId !== docId) {
            setConfirmDeleteId(docId);
            return;
        }

        try {

            const res = await authFetch(`/api/document/${docId}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error();

            setConfirmDeleteId(null);

            await fetchTrailer();

        } catch (e) {

            console.error(e);

        }

    };

    const handleDocumentSubmit = async () => {

        setDocumentError(null);

        if (!trailer) return;

        if (!docTitle || !docValidTo) {
            setDocumentError("Uzupełnij wszystkie pola.");
            return;
        }

        if (dayjs(docValidTo).isBefore(dayjs(), "day")) {
            setDocumentError("Data ważności nie może być wcześniejsza niż dzisiejsza.");
            return;
        }

        try {

            const formData = new FormData();
            formData.append("type", "TRAILER");
            formData.append("title", docTitle);
            formData.append("validTo", docValidTo);
            formData.append("trailer", String(trailer.id));
            if (docPhoto) formData.append("photo", docPhoto);

            const res = await authFetch(`/api/document`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error();

            setDocTitle("");
            setDocValidTo("");
            setDocPhoto(null);

            await fetchTrailer();

        } catch (e) {

            console.error(e);

            setDocumentError("Nie udało się dodać dokumentu.");

        }

    };

    const handleNoteSubmit = async () => {

        setNoteError(null);

        if (!trailer) return;

        if (!noteText.trim()) {
            setNoteError("Treść notatki nie może być pusta.");
            return;
        }

        try {

            const res = await authFetch(`/api/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: noteText,
                    trailer: trailer.id
                })
            });

            if (!res.ok) throw new Error();

            setNoteText("");

            await fetchTrailer();

        } catch (e) {

            console.error(e);

            setNoteError("Nie udało się zapisać notatki.");

        }

    };

    if (loading) {

        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    }

    if (!trailer) {
        return <p>Naczepa nie została znaleziona.</p>;
    }

    return (

        <div className="max-w-6xl mx-auto space-y-8">

            {/* HEADER */}

            <div className="card bg-base-100 shadow">

                <div className="card-body">

                    <h1 className="text-3xl font-bold">
                        {trailer.registrationNumber}
                    </h1>

                    <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">

                        <div>

                            <span className="text-base-content/60">
                                Dodano
                            </span>

                            <div className="font-semibold">
                                {dayjs(trailer.createdAt).format("DD.MM.YYYY")}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* DOCUMENTS */}

            <div className="card bg-base-100 shadow">

                <div className="card-body">

                    <h2 className="card-title">
                        Dokumenty
                    </h2>

                    <div className="bg-base-200 rounded-xl p-4 mt-4">

                        <div className="grid md:grid-cols-2 gap-3">

                            <input
                                type="text"
                                placeholder="Tytuł dokumentu"
                                className="input input-bordered w-full"
                                value={docTitle}
                                onChange={(e) => setDocTitle(e.target.value)}
                            />

                            <input
                                type="date"
                                className="input input-bordered w-full"
                                value={docValidTo}
                                onChange={(e) => setDocValidTo(e.target.value)}
                            />

                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                className="file-input file-input-bordered w-full"
                                onChange={(e) => setDocPhoto(e.target.files?.[0] ?? null)}
                            />

                            <button
                                className="btn btn-primary"
                                onClick={handleDocumentSubmit}
                            >
                                Dodaj dokument
                            </button>

                        </div>

                        {documentError && (
                            <p className="text-error text-sm mt-2">
                                {documentError}
                            </p>
                        )}

                    </div>

                    <div className="divider"></div>

                    <h3 className="font-semibold mt-8">
                        Lista dokumentów
                    </h3>

                    {trailer.documents.length === 0 ? (

                        <p className="text-base-content/60 mt-3">
                            Brak dokumentów.
                        </p>

                    ) : (

                        <div className="overflow-x-auto mt-3">

                            <table className="table table-zebra">

                                <thead>
                                <tr>
                                    <th>Tytuł</th>
                                    <th>Ważne do</th>
                                    <th>Status</th>
                                    <th>Zdjęcie</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>

                                {trailer.documents.map((doc) => {

                                    const diff = dayjs(doc.validTo).diff(dayjs(), "day");

                                    let badge;

                                    if (diff < 0) {
                                        badge = <span className="badge badge-error">Wygasło</span>;
                                    } else if (diff <= 7) {
                                        badge = <span className="badge badge-error">Za {diff} dni</span>;
                                    } else if (diff <= 30) {
                                        badge = <span className="badge badge-warning">Za {diff} dni</span>;
                                    } else {
                                        badge = <span className="badge badge-success">Aktywne</span>;
                                    }

                                    return (

                                        <tr key={doc.id}>

                                            <td className="font-semibold">
                                                {doc.title}
                                            </td>

                                            <td>
                                                {dayjs(doc.validTo).format("DD.MM.YYYY")}
                                            </td>

                                            <td>
                                                {badge}
                                            </td>

                                            <td>
                                                {doc.photoUrl && (
                                                    <a href={doc.photoUrl} target="_blank" rel="noreferrer">
                                                        <img
                                                            src={doc.photoUrl}
                                                            alt="dokument"
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    </a>
                                                )}
                                            </td>

                                            <td className="text-right">

                                                <button
                                                    className="btn btn-xs btn-error"
                                                    onClick={() => handleDeleteDocument(doc.id)}
                                                >
                                                    {confirmDeleteId === doc.id
                                                        ? "Na pewno?"
                                                        : "Usuń"}
                                                </button>

                                            </td>

                                        </tr>

                                    );

                                })}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

            {/* NOTES */}

            <div className="card bg-base-100 shadow">

                <div className="card-body">

                    <h2 className="card-title">
                        Notatki
                    </h2>

                    <div className="flex gap-3 mt-4">

                        <textarea
                            className="textarea textarea-bordered flex-1"
                            placeholder="Dodaj notatkę o przyczepie..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        />

                        <button
                            className="btn btn-primary h-fit"
                            onClick={handleNoteSubmit}
                        >
                            Dodaj
                        </button>

                    </div>

                    {noteError && (
                        <p className="text-error text-sm mt-2">
                            {noteError}
                        </p>
                    )}

                    <div className="divider"></div>

                    {trailer.notes?.length === 0 ? (

                        <p className="text-base-content/60">
                            Brak notatek.
                        </p>

                    ) : (

                        <div className="max-h-80 overflow-y-auto pr-2 space-y-4">

                            {[...trailer.notes].reverse().map((note) => (

                                <div
                                    key={note.id}
                                    className="bg-base-200 rounded-xl p-4"
                                >

                                    <div className="text-xs text-base-content/60 mb-2">
                                        {dayjs(note.createdAt).format("DD.MM.YYYY HH:mm")}
                                    </div>

                                    <p className="text-sm leading-relaxed">
                                        {note.text}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}