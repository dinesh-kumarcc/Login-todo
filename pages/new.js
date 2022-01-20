import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader, Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';

const NewNote = ({ notes }) => {
    console.log(notes, 'noters')

    const [form, setForm] = useState({ title: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [checked, setChecked] = useState([]);
    const router = useRouter();
    const [loginuser, setLoginUser] = useState('');
    const [userRecord, setUserRecord] = useState([]);
    const [togetNote, setGetNote] = useState([]);
    // const [reco]
    const Record = [];

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if(!userId){
            router.push("/");
        }
        if(userId){
            router.push("/new");
        }
        getNote() 
        const users = JSON.parse(localStorage.getItem('loginUserData'));
        console.log(users,'get users',togetNote)
        setLoginUser(users.email);
        createNote();
        if(togetNote){
            console.log(togetNote,'**??***',togetNote)

            for (let i = 0; i < togetNote.length; i++) {
                console.log(togetNote[i].email,'email togetNotessss')    
                if (togetNote[i].email === loginuser) {
                    Record.push(togetNote[i])
                    console.log('record ////',Record,'length',Record.length)
                    setUserRecord(Record)
                    // setUserRecord(Record)
                }
            }
        }
    }, [errors])


    const getNote = async () => {
        const res = await axios.get('http://localhost:3000/api/notes');
        console.log(res.data.data,'res')
        setGetNote(res.data.data)
    }
    console.log(togetNote,'togetnote')

    console.log(loginuser,'login user')
    console.log(loginuser,'login  ***** user',notes)
    const title = loginuser;
    // const [form, setForm] = useState({ title: title,email:loginuser});
    console.log(form,';;;form',loginuser.length);

    // const [form, setForm] = useState({ title: '',email:'id' });

    const createNote = async () => {
        console.log(form.email,'??????',loginuser)
        axios.post("http://localhost:3000/api/notes", {
          title: form.title,
          email: loginuser
        })
        .then(function (response) {
          console.log(response,'>>',response.data.data._id);
          if(response.data.data){

            setIsSubmitting(false);
          }
        })
        .catch(function (error) {
          console.log(error);   
        });
      
      }

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };
    var isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        createNote()
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required';
        }
        // if (!form.description) {
        //     err.description = 'Description is required';
        // }

        return err;
    }

    console.log(userRecord.length,'user lebn')
    return (
        <div className="form-container">
            <div style={{ height: "200px", width: "600px" }}>
                <Card>
                    <h3 style={{textAlign:'center',paddingTop:'8px'}}>THINGS TO DO</h3>
                    <div>
                        {
                            isSubmitting
                                ? <Loader active inline='centered' />
                                : <Form onSubmit={handleSubmit}>
                                    <Form.Input
                                        fluid
                                        error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                        label=''
                                        placeholder='Title'
                                        name='title'
                                        onChange={handleChange}
                                    />
                                    {/* <Button type='submit'></Button> */}
                                    {/* <Button type='submit'> <FontAwesomeIcon className="button11" icon={faPlus} /></Button> */}
                                </Form>
                        }
                    </div>
                    <div style={{ paddingTop: "40px" }}>
                        {userRecord.map((note, index) => {
                            // console.log(index,'note',note,'note')

                            return (
                                <div key={note._id} style={{ textAlign: "center", paddingLeft: "40px", paddingRight: "40px" }}>
                                    <input value={note.title} type="checkbox" onChange={handleCheck} />
                                    <span className={isChecked(note)}>{note.title}</span>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                    <div style={{backgroundColor:'#F4FCE8'}}>
                    <Button style={{backgroundColor:'#F4FCE8',fontSize:'10px'}}> <FontAwesomeIcon className="button11" icon={faPlus} /></Button>
                    <Button style={{backgroundColor:'#F4FCE8',paddingLeft:'1px',fontSize:'10px'}}> <FontAwesomeIcon className="button11" icon={faSearch} /></Button>
                    <Button style={{backgroundColor:'#F4FCE8',paddingLeft:'1px',fontSize:'10px'}}> <FontAwesomeIcon className="button11" icon={faGripLinesVertical} /></Button>
                    <span style={{backgroundColor:'#F4FCE8',paddingLeft:'9px',fontSize:'10px'}}>{userRecord.length} items Left</span>
                    <Button style={{backgroundColor:'#F4FCE8',paddingLeft:'250px',fontSize:'10px'}}>All</Button>
                    <Button style={{backgroundColor:'#F4FCE8',paddingLeft:'2px',fontSize:'10px'}}>Active</Button>
                    <Button style={{backgroundColor:'#F4FCE8',paddingLeft:'2px',fontSize:'10px'}}>Completed</Button>

                    </div>
                    {/* <Button type='submit'> <FontAwesomeIcon className="button11" icon={faPlus} /></Button> */}

                </Card>
            </div>
        </div>
    )
}


NewNote.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/notes');
    const { data } = await res.json();
    console.log(data,'getInitialProps')

    return { notes: data }
}

export default NewNote;