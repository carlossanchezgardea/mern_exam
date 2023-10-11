import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const styles = {
    formContainer: {
        display: "flex",
        flexDirection: "column"
    },
    formItem: {
        marginTop: "3px"
    },
    formSubmit: {
        padding: "5px",
        marginTop: "20px"
    },
    splitForm: {
        display: "flex",
        justifyContent: "space-between",
        width: "500px"
    },
    topNav:{
        display:"flex",
        justifyContent: "space-between",
        paddingRight:"145px",
        alignItems:"center"
    },
    newAuthorLink: {
        color: "blue",
        textDecoration: "underline"
    }
}
const NewPet = () => {
    const navigate = useNavigate()

    const [error, setError] = useState({})
    const [petName, setPetName] = useState("")
    const [petType, setPetType] = useState("")
    const [petDescription, setPetDescription] = useState("")
    const [petSkills, setPetSkills] = useState([])
    const [petLikes, setPetLikes] = useState(0)

    const submitHandler = (e) => {
        e.preventDefault()
        const newPet = {
            petName, petType, petDescription, petSkills, petLikes
        }

        axios.post("http://localhost:8080/api/pets", newPet)
            .then(res => navigate("/pets")
            )
            .catch(err => {
                setError(err.response.data.errors)
                console.log(error)
            })
    }

    return (
        <div>
            <div style={styles.topNav}>
                <h3>Know a pet needing a home?</h3>
                <p>Skills (optional)</p>
            </div>
            <div>
                <form onSubmit={submitHandler} style={styles.splitForm}>

                    <div style={styles.formContainer}>
                        <label style={styles.formItem}>Name:</label>
                        <input style={styles.formItem} type="text" onChange={(e) => setPetName(e.target.value)}/>
                        {error.petName && <p>{error.petName.message}</p>}

                        <label style={styles.formItem}>Type: </label>
                        <input style={styles.formItem} type="text" onChange={(e) => setPetType(e.target.value)}/>
                        {error.petType && <p>{error.petType.message}</p>}

                        <label style={styles.formItem}>Description:</label>
                        <input style={styles.formItem} type="text" onChange={(e) => setPetDescription(e.target.value)}/>
                        {error.petDescription && <p>{error.petDescription.message}</p>}

                        <p style={styles.newAuthorLink} onClick={()=>{navigate("/")}}>Back home</p>
                    </div>

                    <div style={styles.formContainer}>
                        <label style={styles.formItem}>Skill 1:</label>
                        <input style={styles.formItem} type="text" onChange={(e) => {
                            const updatedSkills = [...petSkills]
                            updatedSkills[0] = e.target.value
                            setPetSkills(updatedSkills)
                        }}/>
                        {error.petSkills && <p>{error.petSkills.message}</p>}

                        <label style={styles.formItem}>Skill 2:</label>
                        <input style={styles.formItem} type="text" onChange={(e) => {
                            const updatedSkills = [...petSkills]
                            updatedSkills[1] = e.target.value
                            setPetSkills(updatedSkills)
                        }}/>
                        {error.petSkills && <p>{error.petSkills.message}</p>}

                        <label style={styles.formItem}>Skill 3:</label>
                        <input style={styles.formItem} type="text" onChange={(e) => {
                            const updatedSkills = [...petSkills]
                            updatedSkills[2] = e.target.value
                            setPetSkills(updatedSkills)
                        }}/>
                        {error.petSkills && <p>{error.petSkills.message}</p>}

                        <input style={styles.formSubmit} type="submit" value="Create Pet"/>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default NewPet