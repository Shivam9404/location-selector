import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CitySelector.module.css";

const CitySelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    // Fetch countries
    useEffect(() => {
        axios.get("https://crio-location-selector.onrender.com/countries")
            .then((response) => {
                setCountries(response.data);
            })
            .catch((error) => {
                console.error("Error Fetching Countries: ", error);
            });
    }, []);

    useEffect(() => {
        if (!selectedCountry) return;

        axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
            .then((response) => {
                setStates(response.data);
                setSelectedState("");
            })
            .catch((error) => {
                console.error("Error Fetching States: ", error);
            });
    }, [selectedCountry]);

    useEffect(() => {
        if (!selectedState) return;

        axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
            .then((response) => {
                setCities(response.data);
                setSelectedCity("");
            })
            .catch((error) => {
                console.error("Error Fetching Cities: ", error);
            });
    }, [selectedState]);

    return (
        <div className={styles["city-selector"]}>
            <h1>Select Location</h1>
            <div>
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className={styles.dropdown}
                >
                    <option value="" disabled>Select Country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>

                <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className={styles.dropdown}
                    disabled={!selectedCountry}
                >
                    <option value="" disabled>Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>

                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className={styles.dropdown}
                    disabled={!selectedState}
                >
                    <option value="" disabled>Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            {selectedCity && (
                <h2>
                    You selected <span className={styles.highlight}>{selectedCity}</span>,
                    <span className={styles.fade}> {selectedState}, {selectedCountry}</span>
                </h2>
            )}
        </div>
    );
};

export default CitySelector;
