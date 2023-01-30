import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Container} from "reactstrap";
import {rus} from "../constants/rus";
import {uzb} from "../constants/uzb";
import {us} from "../constants/usa";
import MyTable from "../components/Table";

const Main = () => {
    const [selectedRegion, setRegion] = useState(uzb);
    const [range, setRange] = useState(0);
    const [contacts, setContacts] = useState([]);
    let tempContacts = [];
    const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890-=!@#$%^&*()_+"
    const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
    const [count, setCount] = useState(10);

    function generateFullName(country) {
        let randName = Math.floor(Math.random() * country.names.length);
        let randMidName = Math.floor(Math.random() * country.middleNames.length);
        let randLastName = Math.floor(Math.random() * country.lastNames.length);
        return [
            range > 0 ? country.names[randName] + randomCharacter : country.names[randName],
            country.middleNames[randMidName],
            country.lastNames[randLastName],
        ].join(" ");
    }

    function generateAddress(country) {
        let randCity = Math.floor(Math.random() * country.cities.length);
        let randStreet = Math.floor(Math.random() * country.streets.length);
        let randHouse = Math.floor(Math.random() * 1000);
        let randApartment = Math.floor(Math.random() * 1000);
        return [
            `${country.cities[randCity]} city`,
            `${country.streets[randStreet]} street`,
            `${randHouse} - ${randApartment}`,
        ].join(", ");
    }

    function generatePhone(country) {
        let phone = "";
        let randCode = Math.floor(Math.random() * country.phoneCodes.length);
        phone += country.phoneCodes[randCode];
        for (let i = 0; i < 7; i++) {
            const randInt = Math.floor(Math.random() * 10);
            phone += randInt;
        }
        return phone;
    }

    function generateContacts(country, num) {
        for (let i = 0; i < num; i++) {
            let temp = [];
            temp.push(Math.random() * 9999999999);
            temp.push(generateFullName(country));
            if (country === uzb) {
                temp.push("Uzbekistan");
            }
            if (country === rus) {
                temp.push("Russia");
            }
            if (country === us) {
                temp.push("United States");
            }
            temp.push(generatePhone(country));
            temp.push(generateAddress(country));
            tempContacts.push(temp);
            setContacts(tempContacts);
        }
    }


    useEffect(() => {
        generateContacts(selectedRegion, 10)
    }, [selectedRegion,])
    return (
        <div
            className={"p-3"}>
            <center>
                <div className="alert alert-dismissible alert-warning">
                    <h4 className="alert-heading">Random contact generator!</h4>
                </div>
                <ButtonGroup>
                    <Button
                        color="primary"
                        outline
                        onClick={(e) => {
                            setRegion(uzb)
                            generateContacts(selectedRegion, 10)
                        }}
                        active={selectedRegion === uzb}
                    >
                        Uzbekistan
                    </Button>
                    <Button
                        color="primary"
                        outline
                        onClick={() => {
                            setRegion(rus)
                            generateContacts(selectedRegion, 10)

                        }}
                        active={selectedRegion === rus}
                    >
                        Russia
                    </Button>
                    <Button
                        color="primary"
                        outline
                        onClick={() => {
                            setRegion(us)
                            generateContacts(selectedRegion, 10)
                        }}
                        active={selectedRegion === us}
                    >
                        United States
                    </Button>
                </ButtonGroup>

                <Container className={'my-3'}>

                    <fieldset className="form-group">
                        <legend className="mt-4">Probability of mistakes {range}</legend>
                        <input type="range"
                               min={0}
                               value={range}
                               onChange={(e) => {
                                   setRange(Number(e.target.value))
                                   generateContacts(selectedRegion, 10)


                               }}
                               max={10}
                               step="0.01"
                               className="form-range" id="customRange1"/>

                    </fieldset>
                    <button
                        onClick={() => {
                            generateContacts(selectedRegion, 20)

                        }}
                        type="button"
                        className="btn btn-outline-info">Generate random contact
                    </button>

                </Container>
            </center>

            <br/>
            <br/>
            <div id='tableBodyHeight'

            >
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Full name</th>
                        <th scope="col">Country</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">CSV</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        contacts.map((contact, index) => {
                            return (
                                <MyTable
                                    key={index}
                                    contact={contact}
                                    index={index}
                                    fullName={contact[1]}
                                    country={contact[2]}
                                    phone={contact[3]}
                                    address={contact[4]}
                                />
                            )
                        })
                    }

                    </tbody>
                </table>
                <center>
                    <button
                        onClick={() => {
                            setCount(count + 10)
                            generateContacts(selectedRegion, count)
                        }
                        }
                        className={'btn'}>Load More Data 🔄
                    </button>
                </center>
            </div>


        </div>
    );
};

export default Main;
