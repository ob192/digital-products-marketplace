"use client"

import {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
    User,
    Lock,
    ShoppingBag,
    Eye,
    EyeOff,
    Loader2,
    Check,
    Package,
    ExternalLink,
} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Badge} from "@/components/ui/badge"
import {Card, CardContent} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"
import {createClient} from "@/lib/supabase"
import {useAuth} from "@/lib/auth-context"
import {formatPrice} from "@/lib/utils"

type Tab = "profile" | "purchases"

interface Purchase {
    id: string
    quantity: number
    price: string
    createdAt: string
    product: {
        id: string
        title: string
        slug: string
        image: string
        category: { name: string; slug: string }
    }
}

export function AccountContent() {
    const {user, loading: authLoading} = useAuth()
    const router = useRouter()
    const supabase = createClient()

    const [activeTab, setActiveTab] = useState<Tab>("profile")

    // Password change state
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [pwLoading, setPwLoading] = useState(false)
    const [pwError, setPwError] = useState<string | null>(null)
    const [pwSuccess, setPwSuccess] = useState(false)

    // Purchases state
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [purchasesLoading, setPurchasesLoading] = useState(false)
    const [purchasesError, setPurchasesError] = useState<string | null>(null)

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/")
        }
    }, [user, authLoading, router])

    // Fetch purchases when tab is activated
    useEffect(() => {
        if (activeTab !== "purchases" || purchases.length > 0) return

        setPurchasesLoading(true)
        setPurchasesError(null)

        supabase.auth.getSession().then(({data: {session}}) => {
            if (!session) {
                setPurchasesError("Not authenticated.")
                setPurchasesLoading(false)
                return
            }

            fetch("/api/purchases", {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            })
                .then((r) => r.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setPurchases(data)
                    } else {
                        setPurchasesError("Failed to load purchases.")
                    }
                })
                .catch(() => setPurchasesError("Failed to load purchases."))
                .finally(() => setPurchasesLoading(false))
        })

    }, [activeTab, purchases.length])

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        setPwError(null)
        setPwSuccess(false)

        if (newPassword !== confirmPassword) {
            setPwError("New passwords do not match.")
            return
        }
        if (newPassword.length < 6) {
            setPwError("Password must be at least 6 characters.")
            return
        }

        setPwLoading(true)

        // Re-authenticate first, then update
        const {error: signInError} = await supabase.auth.signInWithPassword({
            email: user!.email!,
            password: currentPassword,
        })

        if (signInError) {
            setPwError("Current password is incorrect.")
            setPwLoading(false)
            return
        }

        const {error} = await supabase.auth.updateUser({password: newPassword})

        if (error) {
            setPwError(error.message)
        } else {
            setPwSuccess(true)
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }

        setPwLoading(false)
    }

    if (authLoading || !user) {
        return (
            <div className="container mx-auto px-4 py-10 max-w-2xl">
                <Skeleton className="h-8 w-48 mb-6"/>
                <Skeleton className="h-10 w-full mb-4"/>
                <Skeleton className="h-10 w-full mb-4"/>
            </div>
        )
    }

    const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
        {id: "profile", label: "Profile", icon: User},
        {id: "purchases", label: "Purchase History", icon: ShoppingBag},
    ]

    return (
        <div className="container mx-auto px-4 py-6 md:py-10 max-w-2xl">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">My Account</h1>
                <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-muted rounded-lg mb-6 md:mb-8">
                {tabs.map(({id, label, icon: Icon}) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                            activeTab === id
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Icon className="h-4 w-4"/>
                        <span className="hidden xs:inline">{label}</span>
                    </button>
                ))}
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
                <div className="space-y-6">
                    {/* Account info card */}
                    <Card>
                        <CardContent className="pt-5 pb-5">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <User className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold truncate">{user.email}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Member since{" "}
                                        {new Date(user.created_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Change password */}
                    <Card>
                        <CardContent className="pt-5 pb-5">
                            <div className="flex items-center gap-2 mb-4">
                                <Lock className="h-4 w-4 text-muted-foreground"/>
                                <h2 className="font-semibold">Change Password</h2>
                            </div>

                            {pwSuccess ? (
                                <div
                                    className="flex items-center gap-2 text-sm text-emerald-500 bg-emerald-500/10 rounded-md px-3 py-2">
                                    <Check className="h-4 w-4"/>
                                    Password updated successfully!
                                </div>
                            ) : (
                                <form onSubmit={handlePasswordChange} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="current-password"
                                                type={showCurrent ? "text" : "password"}
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="pr-9"
                                                required
                                                disabled={pwLoading}
                                                autoComplete="current-password"
                                                placeholder="Enter current password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrent(!showCurrent)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                tabIndex={-1}
                                            >
                                                {showCurrent ? (
                                                    <EyeOff className="h-4 w-4"/>
                                                ) : (
                                                    <Eye className="h-4 w-4"/>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="new-password"
                                                type={showNew ? "text" : "password"}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="pr-9"
                                                required
                                                minLength={6}
                                                disabled={pwLoading}
                                                autoComplete="new-password"
                                                placeholder="At least 6 characters"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNew(!showNew)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                tabIndex={-1}
                                            >
                                                {showNew ? (
                                                    <EyeOff className="h-4 w-4"/>
                                                ) : (
                                                    <Eye className="h-4 w-4"/>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input
                                            id="confirm-password"
                                            type={showNew ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            minLength={6}
                                            disabled={pwLoading}
                                            autoComplete="new-password"
                                            placeholder="Repeat new password"
                                        />
                                    </div>

                                    {pwError && (
                                        <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
                                            {pwError}
                                        </p>
                                    )}

                                    <Button type="submit" disabled={pwLoading}>
                                        {pwLoading && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        )}
                                        Update Password
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Purchases Tab */}
            {activeTab === "purchases" && (
                <div>
                    {purchasesLoading && (
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <Card key={i}>
                                    <CardContent className="pt-4 pb-4">
                                        <div className="flex gap-3">
                                            <Skeleton className="w-16 h-16 rounded-lg shrink-0"/>
                                            <div className="flex-1 space-y-2">
                                                <Skeleton className="h-4 w-3/4"/>
                                                <Skeleton className="h-3 w-1/2"/>
                                                <Skeleton className="h-3 w-1/4"/>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {purchasesError && (
                        <div className="text-center py-12 text-destructive">
                            <p>{purchasesError}</p>
                        </div>
                    )}

                    {!purchasesLoading && !purchasesError && purchases.length === 0 && (
                        <div className="text-center py-16">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                <Package className="h-7 w-7 text-muted-foreground"/>
                            </div>
                            <h3 className="font-semibold mb-2">No purchases yet</h3>
                            <p className="text-muted-foreground text-sm mb-6">
                                Your order history will appear here.
                            </p>
                            <Button asChild>
                                <Link href="/products">Browse Products</Link>
                            </Button>
                        </div>
                    )}

                    {!purchasesLoading && !purchasesError && purchases.length > 0 && (
                        <div className="space-y-3">
                            <p className="text-sm text-muted-foreground mb-4">
                                {purchases.length} order{purchases.length !== 1 ? "s" : ""}
                            </p>
                            {purchases.map((purchase) => (
                                <Card key={purchase.id}>
                                    <CardContent className="pt-4 pb-4">
                                        <div className="flex gap-3 items-start">
                                            {/* Product image */}
                                            <div
                                                className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                                                <Image
                                                    src={purchase.product.image}
                                                    alt={purchase.product.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="64px"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="min-w-0">
                                                        <Link
                                                            href={`/products/${purchase.product.slug}`}
                                                            className="font-medium text-sm hover:text-primary transition-colors line-clamp-1"
                                                        >
                                                            {purchase.product.title}
                                                        </Link>
                                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                            <Badge variant="secondary" className="text-xs">
                                                                {purchase.product.category.name}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground">
                                Qty: {purchase.quantity}
                              </span>
                                                        </div>
                                                    </div>
                                                    <span className="font-semibold text-sm shrink-0">
                            {formatPrice(parseFloat(purchase.price))}
                          </span>
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(purchase.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }
                            )}
                          </span>
                                                    <Link
                                                        href={`/products/${purchase.product.slug}`}
                                                        className="text-xs text-primary hover:underline flex items-center gap-1"
                                                    >
                                                        View product
                                                        <ExternalLink className="h-3 w-3"/>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}