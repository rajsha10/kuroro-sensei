"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sensei } from "@/components/sensei"

export default function SanctumPage() {
  const [activeTab, setActiveTab] = useState("senseis")

  return (
    <main className="min-h-screen washi-texture pt-20">
      <Navigation />

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-2 text-center">
          <span className="text-cherry">聖域</span> Your Sanctum
        </h1>
        <p className="text-xl mb-8 text-center">Track your learning journey and Sensei creations</p>

        <Tabs defaultValue="senseis" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="senseis">My Senseis</TabsTrigger>
            <TabsTrigger value="journey">Learning Journey</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="senseis">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Python Guide", lastUsed: "2 days ago", type: "default" },
                { name: "Math Helper", lastUsed: "1 week ago", type: "default" },
              ].map((sensei, index) => (
                <Card key={index} className="bg-background/80 backdrop-blur-sm border-gold/20">
                  <CardContent className="p-6 flex flex-col items-center">
                    <Sensei type={sensei.type as "default" | "fox"} className="mb-4" />
                    <h3 className="text-xl font-bold mb-1">{sensei.name}</h3>
                    <p className="text-muted-foreground mb-4">Last used: {sensei.lastUsed}</p>

                    <div className="flex gap-2">
                      <Button variant="outline" className="border-cherry text-cherry hover:bg-cherry/10">
                        Continue
                      </Button>
                      <Button
                        variant="outline"
                        className="border-muted-foreground text-muted-foreground hover:bg-muted/10"
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-secondary/30 border-dashed border-muted-foreground/50 flex items-center justify-center h-[300px]">
                <Button variant="outline" className="border-cherry text-cherry hover:bg-cherry/10">
                  Create New Sensei
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="journey">
            <Card className="bg-background/80 backdrop-blur-sm border-gold/20">
              <CardHeader>
                <CardTitle>Your Learning Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-muted-foreground/30"></div>

                  {[
                    {
                      date: "April 5, 2025",
                      title: "Started Python Basics",
                      description: "Began learning with Python Guide Sensei",
                    },
                    {
                      date: "April 7, 2025",
                      title: "Completed First Module",
                      description: "Finished Python variables and data types",
                    },
                    {
                      date: "April 10, 2025",
                      title: "Created Math Helper",
                      description: "Built a new Sensei for calculus learning",
                    },
                  ].map((event, index) => (
                    <div key={index} className="ml-6 mb-8 relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-cherry"></div>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <h3 className="text-lg font-bold">{event.title}</h3>
                      <p>{event.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card className="bg-background/80 backdrop-blur-sm border-gold/20">
              <CardHeader>
                <CardTitle>Your Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gold mb-2">0</div>
                    <p className="text-muted-foreground">Total kōkō earned</p>
                  </div>
                </div>

                <div className="text-center p-8 border border-dashed border-muted-foreground/30 rounded-lg">
                  <p className="mb-4">Share your Senseis with the community to earn kōkō tokens</p>
                  <Button variant="outline" className="border-cherry text-cherry hover:bg-cherry/10">
                    Learn How to Earn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-background/80 backdrop-blur-sm border-gold/20">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" className="border-cherry text-cherry hover:bg-cherry/10">
                      Dark (Default)
                    </Button>
                    <Button
                      variant="outline"
                      className="border-muted-foreground text-muted-foreground hover:bg-muted/10"
                    >
                      Light
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Privacy</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="share-profile" className="mr-2" />
                      <label htmlFor="share-profile">Allow others to view my profile</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="share-senseis" className="mr-2" />
                      <label htmlFor="share-senseis">Allow others to use my public Senseis</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Account</h3>
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
