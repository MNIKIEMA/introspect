import React, { useState, useEffect, useContext } from "react"
import setupBaseUrl from "$utils/setupBaseUrl";
import { MessageManagerContext, SpinningLoader, TextArea } from "@defogdotai/agents-ui-components/core-ui";

const Guidelines = ({
  token,
  apiKeyName,
  guidelineType,
}) => {
  const [guidelines, setGuidelines] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const message = useContext(MessageManagerContext);

  const getGuidelines = async () => {
    setIsLoading(true)
    const res = await fetch(
      setupBaseUrl("http", `oracle/get_guidelines`),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          db_name: apiKeyName,
          guideline_type: guidelineType,
        }),
      }
    )
    setIsLoading(false)

    const data = await res.json()
    setGuidelines(data.guidelines)
  }

  const updateGuidelines = async () => {
    setIsLoading(true)
    const res = await fetch(
      setupBaseUrl("http", `oracle/set_guidelines`),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          db_name: apiKeyName,
          guideline_type: guidelineType,
          guidelines,
        }),
      }
    )
    setIsLoading(false)
    const data = await res.json()
    message.success("Your changes have been saved!")
  }

  useEffect(() => {
    if (!token || !apiKeyName) return
    getGuidelines()
  }, [token, apiKeyName])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">{guidelineType.replaceAll("_", " ")} Guidelines</h1>
      <div className="space-y-4">
        <TextArea
          value={guidelines}
          onChange={(e) => setGuidelines(e.target.value)}
          className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div 
          onClick={updateGuidelines}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center min-w-[100px] text-sm hover:cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? <SpinningLoader className="w-5 h-5" /> : "Update"}
        </div>
      </div>
    </div>
  )
}

export default Guidelines;