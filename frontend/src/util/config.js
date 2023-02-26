let baseUrl = ""
if (process.env.NODE_ENV === "development")
  baseUrl="http://localhost:3001"

export { baseUrl }