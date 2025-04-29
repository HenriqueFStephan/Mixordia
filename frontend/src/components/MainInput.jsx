import "../styles/MainInput.css"

const MainInput = ({label}) => {
  return (
    <>
        <form action="">
            <div class="input-container">
                <input type="text" required=""/>
                <label>{label}</label>		
            </div>
        </form>
    </>
  );
};

export default MainInput;
