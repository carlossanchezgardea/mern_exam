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
    topNav: {
        display: "flex",
        justifyContent: "space-between",
        paddingRight: "145px",
        alignItems: "center"
    },
    newAuthorLink: {
        color: "blue",
        textDecoration: "underline"
    },
    petDetails: {
        display: "flex"
    },
    likeArea: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: "400px"
    }
}
const ViewPet = () => {
    const navigate = useNavigate()

    const {id} = useParams()
    const [temp, setTemp] = useState("")
    const [error, setError] = useState({})
    const [petName, setPetName] = useState("")
    const [petType, setPetType] = useState("")
    const [petDescription, setPetDescription] = useState("")
    const [petSkills, setPetSkills] = useState([])
    const [petLikes, setPetLikes] = useState(0)
    const [buttonDisabled, setButtonDisabled] = useState(false)


    useEffect(() => {
        axios.get(`http://localhost:8080/api/pets/${id}`)
            .then(res => {
                setPetName(res.data.petName)
                setPetType(res.data.petType)
                setPetDescription(res.data.petDescription)
                setPetSkills(res.data.petSkills)
                setTemp(res.data.petName)
                setPetLikes(res.data.petLikes)

            })
    }, []);

    const deletePet = (idz) => {
        axios.delete(`http://localhost:8080/api/pets/${idz}`)
            .then(res => {
                console.log({deletedId: id})
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    const likePet = (idz) => {

        const newLikes = petLikes + 1
        setPetLikes(newLikes)


        axios.put(`http://localhost:8080/api/pets/${idz}/edit`, {petLikes: newLikes})
            .then(res => {
                    console.log(res)
                    setButtonDisabled(true)
                }
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
                <h1>Details about {temp}</h1>
                <button onClick={() => {
                    deletePet(id)
                }}>Adopt Pet
                </button>
            </div>
            <p style={styles.newAuthorLink} onClick={() => {
                navigate("/")
            }}>Back home</p>
            <hr/>
            <div>
                <div style={styles.petDetails}>
                    <h4>Pet type:&nbsp; </h4>
                    <h4>{petType}</h4>
                </div>
                <div style={styles.petDetails}>
                    <h4>Description:&nbsp;</h4>
                    <h4>{petDescription}</h4>
                </div>
                <div style={styles.petDetails}>
                    <h4>Skills: &nbsp;</h4>
                    <div>
                        {petSkills.map((each, idx) => {
                            return (<h4 key={idx}> {each} </h4>)
                        })}
                    </div>
                </div>
            </div>
            <div style={styles.likeArea}>
                <button onClick={() => {
                    likePet(id)
                }} disabled={buttonDisabled}>Like Pet
                </button>
                <h4>Likes: {petLikes}</h4>
            </div>
        </div>
    )
}

export default ViewPet