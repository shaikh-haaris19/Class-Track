"use client";

import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";

const modules = [AllCommunityModule];

export default function AgGridProviderWrapper({ children }) {
    return (
        <AgGridProvider modules={modules}>
            {children}
        </AgGridProvider>
    );
}