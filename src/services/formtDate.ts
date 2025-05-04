export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    // Formata a data no formato dd/mm/yyyy
    const formattedDate = date.toLocaleDateString('pt-BR');
    
    return formattedDate;
}