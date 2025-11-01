"use client";

// React e Next.js
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/Button";
import { List, ProducerItem } from "@/components/List";
import type { ModalRef } from "@/components/Modal";
import { Panel } from "@/components/Panel";
import { Dashboard } from "@/templates";
import { ProducerFormModal } from "../shared/components/ProducerFormModal";

// Hooks e Utils
import { useProducers } from "@/hooks/useProducers";

export default function ProducerPage() {
  const router = useRouter();
  const { data: producers, loading, refetch } = useProducers();

  const modalRef = useRef<ModalRef>(null);

  const load = async () => {
    refetch(true);
  };

  useEffect(() => {
    load();
  }, []);

  const handleOpen = () => modalRef.current?.open();

  const onFinishModal = (reference: string | null) => {
    if ("producer" == reference) {
      modalRef.current?.close(true);
    }

    load();
  };

  return (
    <Dashboard title="Agricultores" subtitle="Nossa rede de produtores">
      <Panel
        title="Gestão de agricultores"
        actions={
          <Button variant="primary" onClick={handleOpen}>
            Adicionar
          </Button>
        }
      >
        {loading ? (
          <div>
            <p>Carregando agricultores...</p>
          </div>
        ) : (
          <List>
            {producers.length > 0 ? (
              producers.map((producer, i) => (
                <ProducerItem
                  key={producer.id}
                  producer={producer}
                  onClick={() => router.push(`/producer/${producer.id}`)}
                />
              ))
            ) : (
              <div>
                <p>Nenhum agricultor cadastrado</p>
              </div>
            )}
          </List>
        )}
      </Panel>

      <ProducerFormModal ref={modalRef} onFinish={onFinishModal} />
    </Dashboard>
  );
}
