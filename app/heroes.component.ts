import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
	selector: 'my-heroes',
	templateUrl: 'app/heroes.component.html', 
	styleUrls: ['app/heroes.component.css'], 
	directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
	heroes: Hero[];
	selectedHero: Hero;
  	addingHero = false;
  	error: any;

	constructor(private heroService: HeroService, private router: Router) { 
	}

	ngOnInit() {
		this.getHeroes();
	}

	getHeroes() {
    	this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  	}

	onSelect(hero: Hero) { 
		this.selectedHero = hero; 
	}

	addHero() {
		this.addingHero = true;
  		this.selectedHero = null;
	}

	deleteHero(hero: Hero, event: any) {
  		event.stopPropagation();
  		this.heroService.delete(hero)
						.then(res => {
        					this.heroes = this.heroes.filter(h => h !== hero);
        					if (this.selectedHero === hero) { 
        						this.selectedHero = null; 
        					}
      					})
      					.catch(error => this.error = error);
	}

	close(savedHero: Hero) {
  		this.addingHero = false;
  		if (savedHero) { 
			this.getHeroes(); 
		}
	}

	goToDetail() {
		let link = ['/detail', this.selectedHero.id];
		this.router.navigate(link);
	}
}