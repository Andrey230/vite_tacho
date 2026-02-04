// PdfDocument.jsx
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

/* ===== Fonts ===== */
Font.register({
    family: "Roboto",
    fonts: [
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
            fontWeight: 400
        },
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
            fontWeight: 700
        },
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
            fontStyle: "italic"
        }
    ]
});

/* ===== Styles ===== */
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        padding: 24,
        fontFamily: 'Roboto'
    },

    header: {
        fontSize: 20,
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 6
    },

    headerDivider: {
        height: 2,
        backgroundColor: '#16a34a',
        width: '60%',
        marginHorizontal: '20%',
        marginBottom: 20
    },

    tableWrapper: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        overflow: 'hidden'
    },

    table: {
        width: '100%'
    },

    tableRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    tableHeader: {
        backgroundColor: '#f3f4f6',
        fontSize: 10,
        fontWeight: 700,
        paddingVertical: 8,
        paddingHorizontal: 6,
        textAlign: 'center',
        color: '#111827'
    },

    tableCell: {
        fontSize: 9,
        paddingVertical: 7,
        paddingHorizontal: 6,
        textAlign: 'center',
        color: '#111827'
    },

    monthCell: {
        fontSize: 9,
        paddingVertical: 7,
        paddingHorizontal: 8,
        textAlign: 'left',
        fontWeight: 500
    },

    rowEven: {
        backgroundColor: '#ffffff'
    },

    rowOdd: {
        backgroundColor: '#f9fafb'
    },

    workGreen: {
        color: '#16a34a',
        fontWeight: 700
    },

    offRed: {
        color: '#dc2626',
        fontWeight: 700
    },

    summaryBox: {
        marginTop: 24,
        padding: 14,
        borderRadius: 8,
        backgroundColor: '#f3f4f6'
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },

    summaryLabel: {
        fontSize: 10,
        color: '#374151'
    },

    summaryValue: {
        fontSize: 10,
        fontWeight: 700,
        color: '#111827'
    }
});

/* ===== Component ===== */
const RankingPdf = ({ items, month }) => {

    const formatMonth = (monthStr) => {
        try {
            const date = new Date(`${monthStr}-01`);
            if (isNaN(date.getTime())) return monthStr;

            return new Intl.DateTimeFormat("pl-PL", {
                month: "long",
                year: "2-digit"
            })
                .format(date)
                .replace(/^./, c => c.toUpperCase());
        } catch {
            return monthStr;
        }
    };

    const totalWork = Object.values(items).reduce(
        (sum, item) => sum + (item.work || 0),
        0
    );

    const totalDistance = Object.values(items).reduce(
        (sum, item) => sum + (item.totalDistance || 0),
        0
    );

    const totalDaysOff = Object.values(items).reduce(
        (sum, item) => sum + (item.dayOff || 0),
        0
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <Text style={styles.header}>STATYSTYKI {month}</Text>
                <View style={styles.headerDivider} />

                {/* Table */}
                <View style={styles.tableWrapper}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableHeader, { width: '33.3%' }]}>Kierowca</Text>
                            <Text style={[styles.tableHeader, { width: '33.3%' }]}>Przebieg</Text>
                            <Text style={[styles.tableHeader, { width: '33.3%' }]}>Dni robocze</Text>
                        </View>

                        {items.map((item, index) => {
                            return <View
                                key={index}
                                style={[
                                    styles.tableRow,
                                    index % 2 === 0 ? styles.rowEven : styles.rowOdd
                                ]}
                            >
                                <Text style={[styles.monthCell, { width: '33.3%' }]}>
                                    {item.driver.name}
                                </Text>

                                <Text style={[styles.tableCell, { width: '33.3%' }]}>
                                    {item.totalDistance || 0} km
                                </Text>

                                <Text style={[styles.tableCell, styles.workGreen, { width: '33.3%' }]}>
                                    {item.additionalInformation.totalWorkDays}
                                </Text>
                            </View>
                        })}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default RankingPdf;
