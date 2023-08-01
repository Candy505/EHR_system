import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./FileUpload";
import Display from "./Display";
import Modal from "./Modal";
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);


  function handleNav()
  {
    navigate('/Info')
  }
  return (
    <>
      <div className="box">

        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
         onClick={()=>handleNav()}
        >
          Profile
        </button>
        {!modalOpen && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setModalOpen(true)}
          >
            Share
          </button>
        )}
      </div>
      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract}></Modal>}

      <div className="App">
        <h1 className="text-white text-3xl font-bold mb-4">File Sharing</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <div className="bg-black p-4">
          <p className="text-white flex justify-end">Account : {account ? account : "Not connected"}</p>
        </div>


        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>

    </>
  );
}

export default Home