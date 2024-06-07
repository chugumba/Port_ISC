import React, { useState, useEffect, useRef } from 'react';
import { Table, Modal, Button, Title } from '@mantine/core';
import { Logistics } from '../../../services/AuthorizedUsers';

export default function ArrivalsTable() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [containerData, setContainerData] = useState([]);
  const tableRef = useRef();

  const fetchData = async () => {
    try {
      const data = await Logistics.arrivalsGet();
      setElements(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
    }
  };

  const fetchContainerData = async (id) => {
    try {
      const response = await Logistics.arrivalContainersGet(id);
      setContainerData(response);
    } catch (error) {
      console.error('Ошибка при загрузке данных контейнеров', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = async (element) => {
    setSelectedElement(element);
    setIsModalOpen(true);
    await fetchContainerData(element.id);
  };

  const handlePrintTable = () => {
    const printContents = tableRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const rows = elements.map((element) => (
    <Table.Tr
      key={element.id}
      onClick={() => handleRowClick(element)}
    >
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.flag}</Table.Td>
      <Table.Td>{element.port_of_dep}</Table.Td>
      <Table.Td>{element.crew}</Table.Td>
      <Table.Td>{element.pier}</Table.Td>
      <Table.Td>{new Date(element.date).toLocaleDateString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <style>{`
      .subs {
        display:none
      }
        @media print {
          .print-button,
          .modal-print-button,
          .mantine-Modal-modal {
            display: none;
          }
          .mantine-Modal-content {
            border: none !important;
            box-shadow: none !important;
          }
          .subs {
            display: block;
          }
        }
      `}</style>

      <div ref={tableRef}>
      <Title order={3} align={"center"} mt={10} className = "subs" style={{ position: 'relative', textAlign: 'left', marginTop: '100px' }}> Прибытия </Title>
      
        <Table bg='var(--mantine-color-gray-0)' highlightOnHover withTableBorder withColumnBorders mt={20} mb={10}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Наименование судна</Table.Th>
              <Table.Th>Порт убытия</Table.Th>
              <Table.Th>Флаг судна</Table.Th>
              <Table.Th>Членов экипажа</Table.Th>
              <Table.Th>Причал прибытия</Table.Th>
              <Table.Th>Дата прибытия</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div className = "subs" style={{ position: 'relative', textAlign: 'left', marginTop: '100px' }}>
            <div>Подпись: _______________________</div>
            <div style={{ position: 'relative', textAlign: 'left', marginTop: '100px' }}>Печать: _______________________</div>
          </div>
      </div>
      <Button className="print-button" onClick={handlePrintTable}>Печать таблицы</Button>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Информация о судне"
        withCloseButton={false}
        size="auto"
      >
        {selectedElement && (
          <div>
            <div>
              <p><strong>ID:</strong> {selectedElement.id}</p>
              <p><strong>Наименование судна:</strong> {selectedElement.name}</p>
              <p><strong>Флаг судна:</strong> {selectedElement.flag}</p>
              <p><strong>Порт убытия:</strong> {selectedElement.port_of_dep}</p>
              <p><strong>Членов экипажа:</strong> {selectedElement.crew}</p>
              <p><strong>Причал прибытия:</strong> {selectedElement.pier}</p>
              <p><strong>Дата прибытия:</strong> {new Date(selectedElement.date).toLocaleDateString()}</p>
            </div>
            <div><Title order={3} align={"center"} mt={10}> Информация о контейнерах </Title></div>
            <div><Title order={4} align={"center"} mb={10}> с судна </Title></div>
            <div style={{width: '630px'}}>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Платформа</Table.Th>
                    <Table.Th>Номер</Table.Th>
                    <Table.Th>Статус</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {containerData.map(container => (
                    <Table.Tr key={container.id}>
                      <Table.Td>{container.id}</Table.Td>
                      <Table.Td>{container.plat_id}</Table.Td>
                      <Table.Td>{container.name}</Table.Td>
                      <Table.Td>{container.source}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </div>
        )}
        <Button className="modal-print-button" mt={30} onClick={() => window.print()}>Печать</Button>
        <div className = "subs" style={{ position: 'relative', textAlign: 'left', marginTop: '100px' }}>
            <div>Подпись: _______________________</div>
            <div style={{ position: 'relative', textAlign: 'left', marginTop: '100px' }}>Печать: _______________________</div>
          </div>
      </Modal>
    </>
  );
}
