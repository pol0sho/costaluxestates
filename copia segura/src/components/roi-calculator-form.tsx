'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { calculateRoiAction } from '@/app/roi-calculator/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from './ui/badge';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

const initialState = {
  message: null,
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full text-base font-bold" disabled={pending}>
      {pending ? 'Calculating...' : 'Calculate ROI'}
    </Button>
  );
}

export function RoiCalculatorForm() {
  const [state, formAction] = useFormState(calculateRoiAction, initialState);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="shadow-lg border-none">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">ROI Calculator</CardTitle>
            <CardDescription>
              Estimate the potential Return on Investment for a property with our AI-powered tool.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="propertyDescription">Property Description</Label>
              <Textarea id="propertyDescription" name="propertyDescription" placeholder="e.g., 3-bedroom apartment, renovated, with balcony..." className="min-h-[100px]" required />
              {state?.errors?.propertyDescription && <p className="text-sm font-medium text-destructive">{state.errors.propertyDescription[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="e.g., Central Malaga" required />
              {state?.errors?.location && <p className="text-sm font-medium text-destructive">{state.errors.location[0]}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="recentTransactionData">Recent Transaction Data</Label>
              <Textarea id="recentTransactionData" name="recentTransactionData" placeholder="e.g., Similar 2-beds sold for €300k-€350k in the last 6 months." className="min-h-[100px]" required />
               {state?.errors?.recentTransactionData && <p className="text-sm font-medium text-destructive">{state.errors.recentTransactionData[0]}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="localAmenities">Local Amenities</Label>
              <Textarea id="localAmenities" name="localAmenities" placeholder="e.g., Near metro station, 2 schools, large park, and a supermarket." className="min-h-[100px]" required />
               {state?.errors?.localAmenities && <p className="text-sm font-medium text-destructive">{state.errors.localAmenities[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="desiredROI">Desired ROI (%)</Label>
              <Input id="desiredROI" name="desiredROI" type="number" placeholder="e.g., 8" required />
              {state?.errors?.desiredROI && <p className="text-sm font-medium text-destructive">{state.errors.desiredROI[0]}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <div className="sticky top-24 h-fit">
        {state?.data ? (
            <Card className="shadow-lg border-none animate-in fade-in-50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-accent"/>
                        Estimation Results
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label>Estimated ROI</Label>
                        <p className="text-5xl font-bold text-accent">{state.data.estimatedROI}%</p>
                    </div>
                     <Alert variant={state.data.recommendation.toLowerCase().includes("good") ? "default" : "destructive"}>
                        {state.data.recommendation.toLowerCase().includes("good") ? <ArrowUp className="h-4 w-4"/> : <ArrowDown className="h-4 w-4"/>}
                        <AlertTitle className="font-bold">Recommendation</AlertTitle>
                        <AlertDescription>{state.data.recommendation}</AlertDescription>
                    </Alert>
                    <div>
                        <Label>Detailed Analysis</Label>
                        <p className="text-muted-foreground text-sm leading-relaxed">{state.data.analysis}</p>
                    </div>
                </CardContent>
            </Card>
        ) : (
            <Card className="shadow-lg border-none bg-secondary flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                        <TrendingUp className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl mt-4">Awaiting Calculation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Your AI-powered ROI estimation will appear here once you submit the form.</p>
                </CardContent>
            </Card>
        )}
        {state?.message && !state.errors && !state.data && (
             <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
        )}
      </div>
    </div>
  );
}
