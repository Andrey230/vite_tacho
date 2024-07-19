import RankingList from "../../components/rankingList";

export default function Statistics(){
    return (
        <>
            <p className="text-2xl font-semibold mb-5">Statystyki kierowców</p>
            <RankingList />
        </>
    );
}