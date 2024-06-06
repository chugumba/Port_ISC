import React, { useState, useEffect, useRef } from 'react';
import { Table, Modal, Button, Title } from '@mantine/core';
import { Logistics } from '../../../services/AuthorizedUsers';

export default function DeparturesTable() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [containerData, setContainerData] = useState([]);
  const tableRef = useRef();

  const fetchData = async () => {
    try {
      const data = await Logistics.departureGroupsGet();
      console.log(data)
      setElements(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
    }
  };

  const fetchContainerData = async (id) => {
    try {
      const response = await Logistics.departedContainersGet(id);
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
    await fetchContainerData(element.group_uuid);
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
      key={element.group_uuid}
      onClick={() => handleRowClick(element)}
    >
      <Table.Td>{element.group_uuid}</Table.Td>
      <Table.Td>{element.record_count}</Table.Td>
      <Table.Td>{new Date(element.first_date_of_departure).toLocaleDateString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>


      <div ref={tableRef}>
      <Title order={3} align={"center"} mt={10} className = "subs" style={{ position: 'relative', textAlign: 'left', marginTop: '100px' }}> Убытия </Title>
      
        <Table bg='var(--mantine-color-gray-0)' highlightOnHover withTableBorder withColumnBorders mt={20} mb={10}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Количество</Table.Th>
              <Table.Th>Дата убытия</Table.Th>
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
        title="Информация о отправке"
        withCloseButton={false}
        size="auto"
      >
        {selectedElement && (
          <div>
            <div>
              <p><strong>ID:</strong> {selectedElement.group_uuid}</p>
              <p><strong>Количество:</strong> {selectedElement.record_count}</p>
              <p><strong>Дата убытия:</strong> {new Date(selectedElement.first_date_of_departure).toLocaleDateString()}</p>
            </div>
            <div><Title order={3} align={"center"} mt={10}> Информация о переданных </Title></div>
            <div><Title order={4} align={"center"} mb={10}> контейнерах </Title></div>
            <div style={{width: '630px'}}>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Платформа</Table.Th>
                    <Table.Th>Номер</Table.Th>
                    <Table.Th>Описание</Table.Th>
                    <Table.Th>Передано</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {containerData.map(container => (
                    <Table.Tr key={container.id}>
                      <Table.Td>{container.id}</Table.Td>
                      <Table.Td>{container.plat_id}</Table.Td>
                      <Table.Td>{container.name}</Table.Td>
                      <Table.Td>{container.desc ? container.desc : 'Описание отсутствует'}</Table.Td>
                      <Table.Td>{container.given_to}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </div>
        )}
        <Button className="modal-print-button"   mt={30} onClick={() => window.print()}>Печать</Button>
        <div className = "subs" style={{ position: 'relative', textAlign: 'left', marginTop: '100px' }}>
            <div>Подпись: _______________________</div>
            <div style={{ position: 'relative', textAlign: 'left', marginTop: '100px' }}>Печать: _______________________</div>
          </div>
      </Modal>
    </>
  );
}
