const Header = ({title,size}) => {  
    if(size>10)
      return <h1>{title}</h1>
    else
      return <h2>{title}</h2>
  
  };

export default Header