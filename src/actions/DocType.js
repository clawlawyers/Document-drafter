import axios from "axios";

export const getRequirements = async (doc_id , type) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/ai-drafter/get_requirements",
      {
        doc_id,
        type 
      }
    );
    return res;
  } catch (e) {
    throw new Error(e.value);
  }
};

export const uploadPre = async(doc_id , req) => {
    console.log(req);
        try{
        const res = await axios.post(
            "http://localhost:8000/api/v1/ai-drafter/upload_prerequisites",
            {
                data: {
                    doc_id: doc_id,
                    essential_requirements:req
                }
            }
        )
        return res;
    }
    catch(e)
    {
        throw new Error(e.value);
    }
}
export const uploadOptional = async(doc_id , req) => {
    try{
        const res = axios.post("http://localhost:8000/api/v1/ai-drafter/upload_optional_parameters",
        {
            data: {
                doc_id: doc_id,
                optional_requirements: req
            }
        }
    )
    return res;
    }
    catch(e)
    {
        throw new Error(e.value);
    }
}

export const generateDocument = async(doc_id) => {
   try{
    const res = await axios.post("http://localhost:8000/api/v1/ai-drafter/generate_document",
    {
        doc_id
    }
)
return res;
   }
   catch(e)
   {
    console.error(e.value)
   }
}