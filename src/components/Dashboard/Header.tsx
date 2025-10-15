import { useState} from "react";
import { PeriodFilter, Period } from "@/components/PeriodFilter";


export default function HeaderSection() {
    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
            </div>
        </div>
        </div>
    );
    }
