// PdfDocument.jsx
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Регистрируем шрифт Roboto с ВСЕМИ нужными вариантами
Font.register({
    family: "Roboto",
    fonts: [
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
            fontWeight: 400,
            fontStyle: "normal"
        },
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
            fontWeight: 700,
            fontStyle: "normal"
        },
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
            fontWeight: 400,
            fontStyle: "italic"
        },
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bolditalic-webfont.ttf",
            fontWeight: 700,
            fontStyle: "italic"
        }
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
        fontFamily: 'Roboto'
    },
    header: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 700 // Используем числовое значение вместо 'bold'
    },
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#ccc',
        borderCollapse: 'collapse'
    },
    tableRow: {
        flexDirection: "row"
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        fontWeight: 700, // Числовое значение
        padding: 6,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 10,
        textAlign: 'center'
    },
    tableCell: {
        padding: 6,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 9,
        textAlign: 'center',
        fontWeight: 400 // Явно указываем нормальный вес
    },
    monthCell: {
        padding: 6,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 9,
        textAlign: 'left',
        fontStyle: 'normal' // МЕНЯЕМ: убираем italic, используем normal
    },
    italicText: {
        fontStyle: 'italic',
        fontWeight: 400 // Явно указываем для italic
    },
    summary: {
        marginTop: 20,
        fontSize: 10,
        fontWeight: 400
    }
});

const PdfDocument = ({ items }) => {
    const formatMonth = (monthStr) => {
        try {
            const date = new Date(`${monthStr}-01`);
            if (isNaN(date.getTime())) return monthStr;

            return new Intl.DateTimeFormat("pl-PL", {
                month: "long",
                year: "2-digit"
            }).format(date)
                .replace(/^./, c => c.toUpperCase());
        } catch (error) {
            return monthStr;
        }
    };

    const totalWork = Object.values(items).reduce((sum, item) => sum + (item.work || 0), 0);
    const totalDistance = Object.values(items).reduce((sum, item) => sum + (item.totalDistance || 0), 0);
    const totalDaysOff = Object.values(items).reduce((sum, item) => sum + (item.dayOff || 0), 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>STATYSTYKI</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableHeader, { width: '25%' }]}>Miesiąc</Text>
                        <Text style={[styles.tableHeader, { width: '20%' }]}>Przebieg</Text>
                        <Text style={[styles.tableHeader, { width: '20%' }]}>Dni robocze</Text>
                        <Text style={[styles.tableHeader, { width: '20%' }]}>Reszta</Text>
                        <Text style={[styles.tableHeader, { width: '15%' }]}>Progres %</Text>
                    </View>

                    {Object.entries(items).map(([month, item]) => {
                        const total = (item.work || 0) + (item.dayOff || 0);
                        const progress = total > 0 ? Math.round((item.work / total) * 100) : 0;

                        return (
                            <View style={styles.tableRow} key={month}>
                                {/* Убираем italic, оставляем обычный текст */}
                                <Text style={[styles.monthCell, { width: '25%' }]}>
                                    {formatMonth(month)}
                                </Text>
                                <Text style={[styles.tableCell, { width: '20%' }]}>
                                    {item.totalDistance || 0} km
                                </Text>
                                <Text style={[styles.tableCell, { width: '20%' }]}>
                                    {item.work || 0}
                                </Text>
                                <Text style={[styles.tableCell, { width: '20%' }]}>
                                    {item.dayOff || 0}
                                </Text>
                                <Text style={[styles.tableCell, { width: '15%' }]}>
                                    {progress}%
                                </Text>
                            </View>
                        );
                    })}
                </View>

                <View style={styles.summary}>
                    <Text>Łączna liczba dni roboczych: {totalWork}</Text>
                    <Text>Łączny przebieg: {totalDistance} km</Text>
                    <Text>Łączna liczba dni wolnych: {totalDaysOff}</Text>
                    <Text>Wygenerowano: {new Date().toLocaleDateString('pl-PL')}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default PdfDocument;