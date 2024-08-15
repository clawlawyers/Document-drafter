import axios from "axios"

export const getAnswer = async(doc_id , query) => {
    try{
        const res = await axios.post("http://localhost:8000/api/v1/ai-drafter/edit_document",
            {
                doc_id : doc_id,
                prompt : query,
            }
        )
        return res
    }
    catch(e){
        throw new Error(e.value);
    }
}

