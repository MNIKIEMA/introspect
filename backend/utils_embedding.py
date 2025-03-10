from openai import AsyncOpenAI

client_openai = AsyncOpenAI()

async def get_embedding(
    text: str,
    model: str="text-embedding-3-small",
    dimensions: int=512
):
    """
    Returns the embedding of the given text, using the text-embedding-3-small model.
    """
    resp = await client_openai.embeddings.create(
        input=text,
        model=model,
        dimensions=dimensions,
    )
    return resp.data[0].embedding