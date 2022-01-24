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
  function toggleComplete(id) {
        console.log('target', id)
        if (complete) {
            //     var index = complete.findIndex(function(o){
            //         return o._id === id;
            //    })
            //    console.log(index,'index exam')
            //    if (index !== -1) {

            //    const newArr = complete.splice(index, 1);
            //    console.log(newArr,'newArr',complete)
            //    setComplete(newArr)
            //    }
            const duplicatedata = complete.map(to => {
                console.log(to, 'to')
                if (to._id === id) {
                    console.log('id match', id)
                    setDuplicateId(id)
                }
            });
        }
        const completed = getNoteData.map(todo => {
            // console.log(todo,'todo map',todo._id)
            if (todo._id === id) {
                setComplete([...complete, todo])
                setCrossLine(true)
            } else {
                return todo;
            }
        })
        console.log(duplicateID, 'duplicate')
        // console.log(toggleAllComplete, 'completed',complete,'duplicate')
    };



    https://contactmentor.com/checkbox-list-react-js-example/

    todo on strike complete line https://codesandbox.io/s/todo-list-hooks-ebfgw?from-embed=&file=/src/ToDoList.js

    Javascript: How to access the return value of a Promise object

 -->



