import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryBox = ({ label, icon: Icon }) => {
  const navigate = useNavigate()
  const [params,setParams] = useSearchParams()
  // console.log(params.get("category")===label);
  const cqu = params.get("category") === label;
  const handelClik = () => {
    let currentQuery = { category: label }
    const url = queryString.stringifyUrl({
      url: "/",
      query:currentQuery
    })
    console.log(url)
    navigate(url)
  }
  return (
    <div
      onClick={handelClik}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer ${cqu && 'border-b-black text-neutral-800'}`}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
