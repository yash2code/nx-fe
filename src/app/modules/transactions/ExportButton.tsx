import { GetQueryParams } from "src/app/types";
import { callApi } from "src/app/utils/callApi";
import { Button } from "./TransactionsPage";

interface ExportButtonProps {
    params: GetQueryParams
}

const ExportButton: React.FC<ExportButtonProps> = ({ params }) => {
    const handleExportClick = async () => {
        try {
            const response = await callApi.get(`/export?search=${params.search}&page=${params.page}&status=${params.statusFilter}`);
            const data = response.data;
            const blob = new Blob([data], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'transactions.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button onClick={handleExportClick}>
            Export
        </Button>
    );
};

export default ExportButton;