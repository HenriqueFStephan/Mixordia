import { useState, useEffect, useCallback } from "react";

export function HookNewsletterForm() {
    const [showForm, setShowForm] = useState(false);

    return {
        showForm,
        setShowForm,
    }
}