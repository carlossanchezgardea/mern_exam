import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const styles = {
    listContainer: {},
    eachContainer: {
        border: "1px solid black",
        marginBottom: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingRight: "80px",
        paddingLeft: "5px",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "24px",
        borderRadius: "7px"
    },
    eachContainerHeader: {
        paddingRight: "130px",
        paddingLeft: "5px",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px",
    },
    buttonContainer: {
        width: "100px",
        display: "flex",
        justifyContent: "space-between"
    },
    newAuthorLink: {
        color: "blue",
        textDecoration: "underline"
    },
    topNav:{
        display:"flex",
        justifyContent: "space-between",
        paddingRight:"50px",
        alignItems:"center"
    }
}

const Main = (props) => {
    const navigate = useNavigate()
    const [pets, setPets] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/pets/')
            .then(res => {
                setPets(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div>
            <div style={styles.topNav}>
                <h4>These pets are looking for a home</h4>
                <p onClick={()=>navigate("/pets/new")} style={styles.newAuthorLink}>Add pet to shelter</p>
            </div>
            <div style={styles.listContainer}>
                <div style={styles.eachContainerHeader}>
                    <p>Name</p>
                    <p>Type</p>
                    <p>Actions</p>
                </div>
                {pets.map((each, idx) => {
                    return (
                        <div key={idx} style={styles.eachContainer}>
                            <div>
                                {each.petName}
                            </div>
                            <div>
                                {each.petType}
                            </div>
                            <div style={styles.buttonContainer}>
                                <button onClick={()=>{navigate(`/pets/${each._id}`)}}>details</button>
                                <button onClick={()=>{navigate(`/pets/${each._id}/edit`)}}>edit</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Main
