import dbConnect from '../../../utils/dbConnect';
import Note from '../../../models/Note';

dbConnect();

export default async (req, res) => {
    console.log(req.body,'>>>>>>>>>>>>',req)
    const { method } = req;
    // const {id} = req.body.query

    switch (method) {
        case 'GET':
            try {
                const notes = await Note.find({});

                res.status(200).json({ success: true, data: notes })
            } catch (error) {
                // res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                console.log('<<<<<<<<<<',req.body,'>>>>>>>>>')
                const note = await Note.create(req.body);
                console.log(note,'>>//////////>>>')

                res.status(201).json({ success: true, data: note })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // case 'POST':
        //     try {
        //         const note = await Note.create(req.body);

        //         res.status(201).json({ success: true, data:  note })
        //     } catch (error) {
        //         res.status(400).json({ success: false });
        //     }
        //     break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}










// import dbConnect from '../../../utils/dbConnect';
// import Note from '../../../models/Note';

// dbConnect();

// export default async (req, res) => {
//     console.log(req.body,'req')
//     const { method } = req;

//     switch (method) {
//         case 'GET':
//             try {
//                 const notes = await Note.find({});

//                 res.status(200).json({ success: true, data: notes })
//             } catch (error) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         case 'POST':
//              try {
//                 const note = await Test.create(req.body);

//                 res.status(201).json({ success: true, data: note })
//             } catch (error) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//             // try {
//             //     console.log(req.body,'>')
//             //     const note = await Note.create(req.body);
//             //     // consoel.log(note,'notee')

//             //     res.status(201).json({ success: true, data: note })
//             // } catch (error) {
//             //     res.status(400).json({ success: false });
//             // }
//             // break;
//         default:
//             res.status(400).json({ success: false });
//             break;
//     }
// }

