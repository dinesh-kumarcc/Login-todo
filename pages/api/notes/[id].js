import dbConnect from '../../../utils/dbConnect';
import Note from '../../../models/Note';

dbConnect();

export default async (req, res) => {
    console.log(req, 'id req')
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const note = await Note.findOne({ email: id });
                console.log(note, ' &&&&&&&&&&&& note &&&&')
                const allnotes = await Note.find({});
                console.log(allnotes, 'allnotes')
                const Record = [];

                if (note) {
                    console.log('**??***', note)
                    for (let i = 0; i < allnotes.length; i++) {
                        console.log(allnotes[i].email, 'email getNoteDatassss', note.email)
                        if (allnotes[i].email === note.email) {
                            console.log(' if loop')
                            Record.push(allnotes[i])
                            console.log('record ////', Record, 'length', Record.length)
                        }
                    }
                }
                res.status(200).json({ success: true, data: Record });


                if (!note) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}