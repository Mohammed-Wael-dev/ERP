import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CategoryProvider } from './context/CategoryContext';
import { AccountingProvider } from './context/AccountingContext';
import { HRProvider } from './context/HRContext';
import { ProcurementProvider } from './context/ProcurementContext';
import { PayrollProvider } from './context/PayrollContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { InventoryProvider } from './context/InventoryContext';
import AppRoutes from './routes/appRoutes';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CategoryProvider>
          <AccountingProvider>
            <HRProvider>
              <PayrollProvider>
                <InventoryProvider>
                  <AttendanceProvider>
                    <ProcurementProvider>
                      <BrowserRouter>
                        <AppRoutes />
                      </BrowserRouter>
                    </ProcurementProvider>
                  </AttendanceProvider>
                </InventoryProvider>
              </PayrollProvider>
            </HRProvider>
          </AccountingProvider>
        </CategoryProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
