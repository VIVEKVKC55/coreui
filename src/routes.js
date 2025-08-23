import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const FileUploadForm = React.lazy(() => import('./views/pages/FileUploadForm'))
const FilePage = React.lazy(() => import('./views/pages/FilePage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/', name: 'Dashboard', element: Dashboard },
  { path: '/file-upload', name: 'File Upload', element: FileUploadForm },
  { path: '/files', name: 'My Files', element: FilePage },
]

export default routes
