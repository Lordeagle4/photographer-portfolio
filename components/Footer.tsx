import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8 mt-12 backdrop-blur-lg dark:bg-opacity-10 border-t border-gray-700">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      <p>&copy; {new Date().getFullYear()} John Doe Photography</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="#" className="hover:text-gray-400"><FaInstagram size={20} /></a>
        <a href="#" className="hover:text-gray-400"><FaFacebook size={20} /></a>
        <a href="#" className="hover:text-gray-400"><FaTwitter size={20} /></a>
      </div>
      </div>
    </footer>
  )
}
