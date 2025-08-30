/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import './States.css'

const States = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');
    const [states, setStates] = useState([]);
    const [state, setState] = useState('');
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCountries();
    }, []);
    useEffect(() => {
        if (country) {
            getStates();
        }
    }, [country]);
    useEffect(() => {
        if (state) {
            getCities();
        }
    }, [state]);

    //get counteries
    const getCountries = async () => {
        try {
            const response = await fetch("https://crio-location-selector.onrender.com/countries");
            if (!response.ok) {
                throw new Error("Failed to fetch countries");
            }
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false);
        }
    };

    //get states
    const getStates = async () => {
        try {
            const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
            if (!response.ok) {
                throw new Error("Failed to fetch states");
            }
            const data = await response.json();
            setStates(data);
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false);
        }
    };

    //get cities
    const getCities = async () => {
        try {
            const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
            if (!response.ok) {
                throw new Error("Failed to fetch states");
            }
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false);
        }
    };



    if (loading) {
        return <p className="status">Loading countries...</p>;
    }


    return (
        <div className="main-container">
            <div className="container">
                <h1>Select Location</h1>
                <div className="main">
                    <select onChange={(e) => setCountry(e.target.value)}>
                        <option>Select Country</option>
                        {
                            countries.map(ct => (
                                <option value={ct} key={ct}>{ct}</option>

                            ))
                        }
                    </select>
                    <select onChange={(e) => setState(e.target.value)} disabled={country == ''}>
                        <option >Select State</option>
                        {
                            states.map(st => (
                                <option value={st} key={st}>{st}</option>

                            ))
                        }
                    </select>
                    <select onChange={(e) => setCity(e.target.value)} disabled={states.length === 0 || cities.length === 0}>
                        <option>Select City</option>
                        {
                            cities.map(ct => (
                                <option value={ct} key={ct}>{ct}</option>

                            ))
                        }
                    </select>
                </div>
                {
                    country && state && city &&
                    <div>
                        You selected {city}, {state}, {country}.
                    </div>
                }
            </div>
        </div>
    );
};

export default States;
