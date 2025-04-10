"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

// ABI for the StartLearning contract
import CONTRACT_ABI from '../../app/abis/Dojo.json'
// ABI for ERC20 token (simplified)
const ERC20_ABI = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]


declare global {
  interface Window {
    ethereum?: any;
  }
}

interface ContractConnectorProps {
  onSuccess: () => void
  buttonText?: string
  className?: string
}

export function ContractConnector({
  onSuccess,
  buttonText = "Begin Learning",
  className = "bg-cherry hover:bg-cherry/80 text-cherry-foreground",
}: ContractConnectorProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x123456789abcdef123456789abcdef123456789"
  const EDU_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_EDU_TOKEN_ADDRESS || "0xabcdef123456789abcdef123456789abcdef1234"
  const FEE = ethers.parseUnits("0.1", 15);

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      if (!window.ethereum) {
        toast({
          title: "MetaMask Required",
          description: "Please install MetaMask to continue.",
          variant: "destructive",
        })
        return
      }

      await window.ethereum.request({ method: "eth_requestAccounts" })
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully.",
      })
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const startLearning = async () => {
    setIsProcessing(true)
    try {
      if (!window.ethereum) {
        await connectWallet()
        return
      }
      // hello 

      
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      const eduToken = new ethers.Contract(EDU_TOKEN_ADDRESS, ERC20_ABI, signer)
      const learningContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const userAddress = await signer.getAddress()
      const balance = await eduToken.balanceOf(userAddress)

      if (balance < BigInt(FEE)) {
        toast({
          title: "Insufficient EDU",
          description: `Your balance is too low. You have ${ethers.formatUnits(balance, 15)} EDU.`,
          variant: "destructive",
        })
        console.log("returning");
        console.log("User Balance", balance);
        console.log("fee", FEE);
        return
      }

      const approveTx = await eduToken.approve(CONTRACT_ADDRESS, FEE)
      toast({
        title: "Approving Transaction",
        description: "Please confirm the approval in MetaMask...",
      })

      await approveTx.wait()

      const tx = await learningContract.startLearning()
      toast({
        title: "Processing Payment",
        description: "Your transaction is being processed...",
      })

      await tx.wait()

      toast({
        title: "Payment Successful",
        description: "Your learning journey can now begin!",
      })

      onSuccess()
    } catch (error) {
      console.error("Error starting learning:", error)
      toast({
        title: "Transaction Failed",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Button onClick={startLearning} disabled={isConnecting || isProcessing} className={className}>
      {isConnecting ? "Connecting Wallet..." : isProcessing ? "Processing Payment..." : buttonText}
    </Button>
  )
}
