import { useState } from "react";
import { 
  Paper, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import { Cancel, CheckCircle  } from "@mui/icons-material/";

export const TableProducts: React.FC<ITableProductProps> = ({ dataFile }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return(
    <Box sx={{ width: "100%" }} component={Paper} elevation={24} borderRadius={5}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell 
                key={"code"}
                align="left"
                style={{ minWidth: 100 }}
              >
                COD
              </TableCell>
              <TableCell 
                key={"name"}
                align="left"
                style={{ minWidth: 170 }}
              >
                Nome
              </TableCell>
              <TableCell 
                key={"sales_price"}
                align="center"
                style={{ minWidth: 170 }}
              >
                Preço Atual
              </TableCell>
              <TableCell 
                key={"new_price"}
                align="center"
                style={{ minWidth: 170 }}
              >
                Novo Preço
              </TableCell>
              <TableCell 
                key={"status"}
                align="center"
                style={{ minWidth: 170 }}
              >
                Situação
              </TableCell>
              <TableCell 
                key={"errors"}
                align="center"
                style={{ minWidth: 170 }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFile
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.data.code}>
                    <TableCell 
                      align="left"
                      style={{ minWidth: 100 }}
                    >
                      {row.data.code}
                    </TableCell>
                    <TableCell 
                      align="left"
                      style={{ minWidth: 200 }}
                    >
                      {row.data.name}
                    </TableCell>
                    <TableCell 
                      align="center"
                      style={{ minWidth: 100 }}
                    >
                      {row.data.sales_price.toFixed(2)}
                    </TableCell>
                    <TableCell 
                      align="center"
                      style={{ minWidth: 100 }}
                    >
                      {row.data.new_price.toFixed(2)}
                    </TableCell>
                    <TableCell 
                      align="center"
                      style={{ minWidth: 200 }}
                    >
                      {row.isError ?
                        row.error.map(error => {
                          return(
                            <Box key={error}>
                              <Typography color="red">{error}*</Typography>
                            </Box>
                          );
                        })
                        :
                        ["Não há erro."].map(error => error)
                      }
                    </TableCell>
                    <TableCell 
                      align="center"
                      style={{ minWidth: 170 }}
                    >
                      {!row.isError ? <CheckCircle color="primary" /> : <Cancel color="error" />}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dataFile.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
