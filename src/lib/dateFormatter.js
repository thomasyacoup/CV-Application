export function dateFormatter(dateString) {
  if (dateString == "Present") return dateString;
  
  const [year, month] = dateString.split('-');
  const date = new Date(year, month - 1);
  
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}