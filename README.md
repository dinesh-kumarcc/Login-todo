This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

Update the `next.config.js` file with your mongodb connection string.

```js

module.exports = {
    env: {
        MONGO_URI: "Your connection string"
    }
}

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.










<!-- 
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form, Checkbox } from 'semantic-ui-react';
// import { Form, Button, Row, Col, Card } from "react-bootstrap";

const Login = ({ notes }) => {
  return (
    <div className="notes-container">
      <h1>N</h1>
      <div>
      

      </div>
      {/* <div style={{ paddingLeft: '300px', paddingRight: '300px' }}>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div> */}
     
      {/* <div className="grid wrapper">
        {notes.map(note => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

// getInitialProps from next.js function that would allow us to runs some code before the actuall component render out the page

// so this will we run server side 

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');
  const { data } = await res.json();

  return { notes: data }
}




export default Login; 



    // const createNote = async () => {
    //     console.log(form,';form',id)
    //     try {
    //         const res = await fetch('http://localhost:3000/api/notes', {
    //             method: 'POST',
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             // body: JSON.stringify(form)
    //         })
    //         const data = await res;
    //         console.log(data,'/////////')
    //         if(data.status == 201){
    //             setIsSubmitting(false)
    //         }
    //         // alert("Added")
    //         // router.push("/home");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


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
        


 {/* <div style={{ paddingTop: "40px" }}>
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
                    </div> */}






















                    ////////////////////////////////////////////////////////////



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

const NewNote = ({notes}) => {
    console.log(notes, 'noters')

    const [form, setForm] = useState({ title: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    // const [checked, setChecked] = useState([]);
    const router = useRouter();
    const [loginuser, setLoginUser] = useState('');
    const [userRecord, setUserRecord] = useState([]);
    const [togetNote, setGetNote] = useState('');
    const [addButton, setAddButton] = useState(false);
    const [searchButton, setSearchButton] = useState(false);
    const [logout, setLogout] = useState(false);
    const [freshRec, setFreshRec] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const Record = [];
    const [getNoteData,setGetNotesData] = useState([]);
    // var getUserId = localStorage.getItem('userId');
    useEffect(() => {
        getNote();
        console.log(togetNote, 'target node',getNoteData)
    }, [togetNote])

    useEffect(() => {
        console.log(notes, 'notes ++')
        const userId = localStorage.getItem('userId');
        if (!userId) {
            router.push("/");
        }
        if (userId) {
            router.push("/new");
        }

        const users = JSON.parse(localStorage.getItem('loginUserData'));
        console.log(users, 'get users')
        setLoginUser(users.email);
        const userLogin = users.email;
        console.log(userLogin, ' check user login')
        // createNote();
        if (togetNote) {
            console.log('**??***', togetNote)

            for (let i = 0; i < togetNote.length; i++) {
                console.log(togetNote[i].email, 'email togetNotessss', users.email)
                if (togetNote[i].email === users.email) {
                    console.log(' if loop')
                    Record.push(togetNote[i])
                    console.log('record ////', Record, 'length', Record.length)
                    setUserRecord(Record)
                    setFreshRec(true)

                    // setUserRecord(Record)
                }
            }
        }
    }, [errors, logout, freshRec])
  

    const getNote = async () => {
        axios.get('http://localhost:3000/api/notes')
          .then(function (response) {
            console.log(response.data.data,'get new function');
            setGetNotesData(response.data.data)
          })
          .catch(function (error) {
            console.log(error);
          })
         
        // const res = await axios.get('http://localhost:3000/api/notes');
        // console.log(res.data.data, 'res')
        // setGetNote(res.data.data)
    }
    // console.log(togetNote, 'togetnote')

    // console.log(loginuser, 'login user')
    // console.log(loginuser, 'login  ***** user', notes)
    // console.log(form, ';;;form', loginuser.length);


    const createNote = async () => {
        console.log(form.email, '??????', loginuser)
        axios.post("http://localhost:3000/api/notes", {
            title: form.title,
            email: loginuser
        })
            .then(function (response) {
                console.log(response, '>>', response.data.data._id);
                if (response.data.data) {

                    setIsSubmitting(false);
                    getNote();
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

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

        return err;
    }

    function pulsButton() {
        setAddButton(true)
        setSearchButton(false)
    }

    function searchBut() {
        setSearchButton(true)
        setAddButton(false)
    }

    function logoutUser() {
        localStorage.removeItem("userId");
        setLogout(true)
    }

    function crossLine(event) {
        const element = event.target;
        element.classList.toggle("crossed-line");
    }

    console.log(userRecord.length, 'user lebn')
    return (
        <div className="form-container">
            <Link href="/new">
                <a className="create" onClick={logoutUser}>Logout</a>
            </Link>
            <div style={{ height: "200px", width: "600px" }}>
                <Card>
                    <h3 style={{ textAlign: 'center', paddingTop: '8px' }}>THINGS TO DO</h3>
                    <div>
                        {/* <input onChange={event => setSearchValue(event.target.value)} value={searchValue} type="text" placeholder="Enter product name to search..." style={{ width: '50%', height: '40px', fontSize: '16px' }}></input> */}
                        {/* {
                            isSubmitting
                                ? <Loader active inline='centered' />
                                :  */}

                        <Form onSubmit={handleSubmit}>
                            {addButton ? (<>
                                <Form.Input
                                    fluid
                                    error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                    label=''
                                    placeholder='Title'
                                    name='title'
                                    onChange={handleChange}
                                />
                            </>) : ""}
                            {searchButton ? (<>
                                <Form.Input
                                    fluid
                                    error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                    label=''
                                    placeholder='Search '
                                    // name='title'
                                    value={searchValue}
                                    onChange={event => setSearchValue(event.target.value)} value={searchValue}
                                />
                            </>) : ""}
                            {/* <Button type='submit'></Button> */}
                            {/* <Button type='submit'> <FontAwesomeIcon className="button11" icon={faPlus} /></Button> */}
                        </Form>
                        {/* } */}
                    </div>
                    <div style={{ paddingTop: "40px" }}>
                        {getNoteData.filter(product => {
                            if (!searchValue) { return true } else return product.title.toLowerCase().includes(searchValue.toLowerCase())
                        }).map((note, index) => {

                            return (
                                <div key={note._id} style={{ textAlign: "center", paddingLeft: "40px", paddingRight: "40px" }}>
                                    {note.email == loginuser ? (<>
                                    <input value={note.title} type="checkbox"/>
                                    <span onClick={crossLine}>{note.title}</span>
                                    <hr />
                                    </>):""}
                                </div>
                            )
                        })}
                    </div>

                    <div style={{ backgroundColor: '#F4FCE8' }}>
                        <Button style={{ backgroundColor: '#F4FCE8', fontSize: '10px' }} onClick={pulsButton}> <FontAwesomeIcon className="button11" icon={faPlus} /></Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '1px', fontSize: '10px' }} onClick={searchBut}> <FontAwesomeIcon className="button11" icon={faSearch} /></Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '1px', fontSize: '10px' }}> <FontAwesomeIcon className="button11" icon={faGripLinesVertical} /></Button>
                        <span style={{ backgroundColor: '#F4FCE8', paddingLeft: '9px', fontSize: '10px' }}>{userRecord.length} items Left</span>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '250px', fontSize: '10px' }}>All</Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '2px', fontSize: '10px' }}>Active</Button>
                        <Button style={{ backgroundColor: '#F4FCE8', paddingLeft: '2px', fontSize: '10px' }}>Completed</Button>

                    </div>
                    {/* <Button type='submit'> <FontAwesomeIcon className="button11" icon={faPlus} /></Button> */}

                </Card>
            </div>
        </div>
    )
}


NewNote.getInitialProps = async () => {
    // const userId = localStorage.getItem('userId');
    console.log('77777777777777')
    const res = await fetch('http://localhost:3000/api/notes');
    const { data } = await res.json();
    console.log(data, 'getInitialProps')

    return { notes: data }
}

export default NewNote;













//////////////////////////////////////////////


if (notes) {
    console.log('**??***', notes)

    for (let i = 0; i < notes.length; i++) {
        console.log(notes[i].email, 'email notesssss',users.email)
        if (notes[i].email === users.email) {
            console.log(' if loop')
            Record.push(notes[i])
            console.log('record ////', Record, 'length', Record.length)
            setUserRecord(Record)
            setFreshRec(true)

            // setUserRecord(Record)
        }
    }
}







-->