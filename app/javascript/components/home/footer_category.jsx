import React from 'react'

function FooterCategory(){
  return(
    <div className="md:w-1/2 w-full px-4">
      <h2 className="text-white title-font font-medium tracking-widest text-sm mb-3">CATEGORIES</h2>
      <nav className="list-none mb-10">
        <li>
          <a className="text-gray-300 hover:text-white">First Link</a>
        </li>
        <li>
          <a className="text-gray-300 hover:text-white">Second Link</a>
        </li>
        <li>
          <a className="text-gray-300 hover:text-white">Third Link</a>
        </li>
        <li>
          <a className="text-gray-300 hover:text-white">Fourth Link</a>
        </li>
      </nav>
    </div>
  );
}

export default FooterCategory;