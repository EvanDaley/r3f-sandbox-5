flowchart TD
%% ===========
%% STRUCTURE
%% ===========

subgraph ClientA["Client A"]
A1[NetworkSystem<br/>(connects to host)]
A2[worldStore<br/>(replica from host)]
A3[R3F Scene<br/>(renders players)]
A1 --> A2 --> A3
end

subgraph ClientB["Client B"]
B1[NetworkSystem<br/>(connects to host)]
B2[worldStore<br/>(replica from host)]
B3[R3F Scene<br/>(renders players)]
B1 --> B2 --> B3
end

subgraph Host["Host (Authoritative Peer)"]
H1[NetworkSystem<br/>(PeerJS server + broadcaster)]
H2[worldStore<br/>(authoritative player list)]
H3[R3F Scene<br/>(renders shared world)]
H1 --> H2 --> H3
end

%% ===========
%% CONNECTIONS
%% ===========
A1 -.->|connects via PeerJS| H1
B1 -.->|connects via PeerJS| H1

%% Data Flow
A1 -->|join / move| H1
B1 -->|join / move| H1
H1 -->|player_list broadcast| A1
H1 -->|player_list broadcast| B1

%% Legend
classDef host fill:#dae8fc,stroke:#6c8ebf,stroke-width:1px;
classDef system fill:#d5e8d4,stroke:#82b366,stroke-width:1px;
classDef store fill:#fff2cc,stroke:#d6b656,stroke-width:1px;
classDef render fill:#f8cecc,stroke:#b85450,stroke-width:1px;

class H1,H2,H3 host
class A1,B1 system
class A2,B2 store
class A3,B3 render
