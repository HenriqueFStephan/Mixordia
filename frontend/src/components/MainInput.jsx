import "../styles/MainInput.css"

const MainInput = ({label, setValue}) => {
  return (
    <>
        <form action="">
            <div class="input-container">
                <input type="text" required="" onChange={setValue}/>
                <label>{label}</label>		
            </div>
        </form>
    </>
  );
};

export default MainInput;
