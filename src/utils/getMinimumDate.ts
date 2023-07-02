export const getMinimumDate = ():string => {
    const currentDate = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(currentDate.getFullYear() - 18);
  
    const year = minAgeDate.getFullYear();
    const month = String(minAgeDate.getMonth() + 1).padStart(2, '0');
    const day = String(minAgeDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }