import React from 'react'

function PageNotFound() {
  return (
    <>
        <div className='flex h-screen items-center justify-center space-x-2 flex-col'>
            <span>404</span>
            <div className='text-xl font-semibold text-green-900'>Page not found</div>
        </div>
    </>
  )
}

export default PageNotFound
