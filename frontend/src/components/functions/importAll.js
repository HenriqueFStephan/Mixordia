    function importAll(folder) {
        return folder.keys().map((photoPath, idx) => ({      
            name: photoPath.replace("./", ""), 
            index: idx
        }));
    }




    export default importAll