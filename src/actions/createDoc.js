import axios from "axios";
export const createDoc = async()=> {
    try{
        const res = await axios.get("http://localhost:8000/api/v1/ai-drafter/create_document");
        return res;
    }
    catch(e)
    {
        throw new Error(e.value);
    }
}

export const getDocFromPrompt = async (doc_id , prompt) => {
    try{
        const res = await axios.post("http://localhost:8000/api/v1/ai-drafter/get_document_from_prompt",
            {
                doc_id : doc_id,
                prompt : prompt
            }
        )
        return res;
    }
    catch(e) {
        throw new Error(e.value);
    }
}