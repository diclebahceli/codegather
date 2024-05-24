export default function Page() {
  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center bg-dark">
      <div className="fs-l text-danger fw-bold">
        Unauthorized
      </div>
      <div className="text-white fs-4">
        You are not authorized to view this page
      </div>
    </div>
  )
}
