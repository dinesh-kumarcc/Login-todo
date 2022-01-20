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
-->