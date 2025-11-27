import { useState, useEffect, useCallback } from "react";

export function HookNewsletterForm() {
    const [showForm, setShowForm] = useState(false);

    const [name, setName] = useState('')

    const [age, setAge] = useState(0)

    const [country, setCountry] = useState('')

    const [email, setEmail] = useState('')

    const [showImages, setShowImages] = useState(false);

    return {
        showForm,
        setShowForm,
        showImages,
        setShowImages,
        name,
        setName,
        age,
        setAge,
        country,
        setCountry,
        email,
        setEmail,
    }
}

