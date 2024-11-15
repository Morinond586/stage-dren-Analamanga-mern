import React, { useEffect, useState } from 'react';
import '../Activiter/index.css';
import './main.css';
import SidbarServer from './SidbarServer';
import ServerHeader from './ServerHeader';
import AttestationFooter from '../Attestqtion/AttestatiionFooter';
import BackToTop from '../Interface/BackToTop';
import axios from 'axios';
import profil from '../images/user_100px.png'
function ProfilUsers() {
    const [dataList, setDataList] = useState([]); // State for user data
    const [currentPage, setCurrentPage] = useState(0); // Current page
    const usersPerPage = 3; // Users per page

    const getFetchData = async () => { // Fetch user data from the API
        try {
            const response = await axios.get("http://localhost:7000/users");
            if (response.data.success) {
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        getFetchData();
    }, []);

    // Calculate users to display for the current page
    const displayedUsers = dataList.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

    const handleNext = () => {
        if ((currentPage + 1) * usersPerPage < dataList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <ServerHeader />
            <SidbarServer />
            <div className='main'>
                <div className="main--contents" style={{ marginTop: '-1000px', marginLeft: '-20px' }}>
                    {/* New Users Section */}
                    <div className="new-users">
                        <h2>List Utilisateurs</h2>
                        <div className="users-list">
                            {displayedUsers.length > 0 ? (
                                displayedUsers.map((el) => (
                                    <div className="user" key={el._id}>
                                        {/* {el.photo && (
                                            <img
                                                src={`http://localhost:7000/${el.photo}`} // Corrected URL
                                                style={{ width: '40px', borderRadius: '50%' }} // Style adjustments for profile image
                                            />
                                        )} */}
                                          <img src={profil} />
                                        <h2>{el.name}</h2> {/* User name */}
                                    </div>
                                ))
                            ) : (
                                <p>Aucun utilisateur trouvé</p>
                            )}
                            <div className="pagination-controls" style={{ margin: '50px' }}>
                                <button onClick={handlePrevious} disabled={currentPage === 0} className='m-2' style={{ padding: '10px' }}>
                                    Previous
                                </button>
                                <button className='m-2' style={{ padding: '10px' }} onClick={handleNext} disabled={(currentPage + 1) * usersPerPage >= dataList.length}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* End of New Users Section */}

                    {/* Recent Orders Tables */}
                    <div className="recent-orders">
                        <h2>Utilisateurs des systèmes</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Email</th>
                                    <th>Date de naissance</th>
                                    <th>Description</th>
                                    <th>Activer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList.length > 0 ? (
                                    dataList.map((el) => (
                                        <tr key={el._id}>
                                            <td>{el.name}</td>
                                            <td>{el.prenom}</td>
                                            <td>{el.email}</td>
                                            <td>{el.dateOfBirth}</td>
                                            <td>{el.description}</td>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }}>Aucune donnée</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <a href="#">Show All</a>
                    </div>
                    {/* End of Recent Orders */}
                </div>
            </div>
            <AttestationFooter />
            <BackToTop />
        </div>
    );
}

export default ProfilUsers;
