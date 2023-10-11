import {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

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
const EditPet = () => {
    const navigate = useNavigate()

    const {id} = useParams()
    const[temp, setTemp] =useState("")
    const [error, setError] = useState({})
    const [petName, setPetName] = useState("")
    const [petType, setPetType] = useState("")
    const [petDescription, setPetDescription] = useState("")
    const [petSkills, setPetSkills] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8080/api/pets/${id}`)
            .then(res =>{
                setPetName(res.data.petName)
                setPetType(res.data.petType)
                setPetDescription(res.data.petDescription)
                setPetSkills(res.data.petSkills)
                setTemp(res.data.petName)

            })
    }, []);


    const submitHandler = (e) => {
        e.preventDefault()
        const newPet = {
            petName, petType, petDescription, petSkills
        }


        axios.put(`http://localhost:8080/api/pets/${id}/edit`, newPet)
            .then(res => navigate("/pets")
            )
            .catch(err => {
                console.log(err)
                setError(err.response.data.errors)
                console.log(error)
            })
    }

    return (
        <div>
            <div style={styles.topNav}>
                <h3>Edit {temp}</h3>
                <p>Skills (optional)</p>
            </div>
            <div>
                <form onSubmit={submitHandler} style={styles.splitForm}>

                    <div style={styles.formContainer}>
                        <label style={styles.formItem}>Name:</label>
                        <input name="petName" style={styles.formItem} type="text" value={petName} onChange={(e) => setPetName(e.target.value)} />

                        {error.petName && <p>{error.petName.message}</p>}

                        <label style={styles.formItem}>Type: </label>
                        <input name="petType" style={styles.formItem} type="text" value={petType} onChange={(e) => setPetType(e.target.value)} />

                        {error.petType && <p>{error.petType.message}</p>}

                        <label style={styles.formItem}>Description:</label>
                        <input name="petDescription" style={styles.formItem} type="text" value={petDescription} onChange={(e) => setPetDescription(e.target.value)} />

                        {error.petDescription && <p>{error.petDescription.message}</p>}
                        <p style={styles.newAuthorLink} onClick={()=>{navigate("/")}}>Back home</p>

                    </div>

                    <div style={styles.formContainer}>
                        <label style={styles.formItem}>Skill 1:</label>
                        <input style={styles.formItem} type="text" onChange={(e) => {
                            const updatedSkills = [...petSkills]
                            updatedSkills[0] = e.target.value
                            setPetSkills(updatedSkills)
                        }}  value={petSkills[0]}/>
                        {/*{error.name && <p>{error.name.message}</p>}*/}

                        <label style={styles.formItem}>Skill 2:</label>
                        <input style={styles.formItem} type="text" onChange={(e) => {
                            const updatedSkills = [...petSkills]
                            updatedSkills[1] = e.target.value
                            setPetSkills(updatedSkills)
                        }} value={petSkills[1]}/>
                        {/*{error.type && <p>{error.type.message}</p>}*/}

                        <label style={styles.formItem}>Skill 3:</label>
                        <input style={styles.formItem} type="text" onChange={(e) => {
                            const updatedSkills = [...petSkills]
                            updatedSkills[2] = e.target.value
                            setPetSkills(updatedSkills)
                        }} value={petSkills[2]}/>
                        {/*{error.description && <p>{error.description.message}</p>}*/}

                        <input style={styles.formSubmit} type="submit" value="Update Pet"/>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditPet